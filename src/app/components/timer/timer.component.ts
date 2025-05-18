import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
  @Output() change = new EventEmitter<'history' | 'timer'>();

  min: string = '00';
  sec: string = '00';
  isRunning: boolean = false;
  intervalId: any;

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

  goHistory() {
    this.change.emit('history');
  }

  startTimer() {
    this.isRunning = true;
    const minValue = this.form.get('minutes')?.value ?? 0;
    this.min = minValue.toString().padStart(2, '0');
    this.sec = '00';

    let totalSeconds = (minValue * 60);

    this.updateDocumentTitle();

    this.intervalId = setInterval(() => {
      if (totalSeconds <= 0) {
        this.stopTimer();
        return;
      }

      totalSeconds--;

      this.min = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
      this.sec = (totalSeconds % 60).toString().padStart(2, '0');
      this.updateDocumentTitle();
    }, 1000);
  }

  stopTimer() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.form.reset({ minutes: 0, task: '' });
    this.min = '00';
    this.sec = '00';
    document.title = 'Focus Timer'; 
  }

  updateDocumentTitle() {
    document.title = `${this.min}:${this.sec} - Focus Timer`;
  }
}
