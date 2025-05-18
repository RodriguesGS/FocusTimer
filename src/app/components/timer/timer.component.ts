import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {
  @Input() activeWindow: 'history' | 'timer' = 'timer';
  @Output() change = new EventEmitter<'history' | 'timer'>();

  goHistory() {
    this.change.emit('history');
  }
}
