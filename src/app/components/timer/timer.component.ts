import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HistoryItem } from '../history/history.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    MatIconModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  @Input() activeWindow: 'history' | 'timer' = 'timer';
  @Input() timerState!: { isRunning: boolean; totalSeconds: number; task: string };

  @Output() change = new EventEmitter<'history' | 'timer'>();
  @Output() addItem = new EventEmitter<HistoryItem>();
  @Output() updateStatus = new EventEmitter<{ index: number, status: 'Interrupted' | 'Conclued' }>();
  @Output() startGlobalTimer = new EventEmitter<{ minutes: number, task: string }>();
  @Output() stopGlobalTimer = new EventEmitter<void>();

  currentHistoryIndex: number | null = null;

  form = new FormGroup({
    minutes: new FormControl<number | null>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    task: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ])
  });

  get min() {
    return Math.floor(this.timerState.totalSeconds / 60).toString().padStart(2, '0');
  }
  get sec() {
    return (this.timerState.totalSeconds % 60).toString().padStart(2, '0');
  }

  goHistory() {
    this.change.emit('history');
  }

  startTimer() {
    const minValue = this.form.get('minutes')?.value ?? 0;
    const taskValue = this.form.get('task')?.value || '';

    const item: HistoryItem = {
      task: taskValue,
      duration: `${minValue} min`,
      date: new Date(),
      status: 'In progress'
    };
    this.addItem.emit(item);
    this.currentHistoryIndex = 0;

    this.startGlobalTimer.emit({ minutes: minValue, task: taskValue });
  }

  stopTimer() {
    this.stopGlobalTimer.emit();

    if (this.currentHistoryIndex !== null) {
      this.updateStatus.emit({ index: this.currentHistoryIndex, status: 'Interrupted' });
      this.currentHistoryIndex = null;
    }

    this.form.reset({ minutes: 0, task: '' });
  }
}