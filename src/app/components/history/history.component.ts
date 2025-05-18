import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ MatIconModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() activeWindow: 'history' | 'timer' = 'history';
  @Output() change = new EventEmitter<'timer'>();

  goTimer() {
    this.change.emit('timer');
  }
}
