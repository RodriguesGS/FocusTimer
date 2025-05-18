import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface HistoryItem {
  task: string;
  duration: string;
  date: Date;
  status: 'Conclued' | 'Interrupted' | 'In progress';
}
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ 
    MatIconModule,
    
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent {
  @Input() activeWindow: 'history' | 'timer' = 'history';
  @Input() history: HistoryItem[] = [];

  @Output() change = new EventEmitter<'timer'>();

    formatDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) {
      return 'less than a minute ago';
    } else if (diffMin === 1) {
      return '1 minute ago';
    } else if (diffHour < 1) {
      return `${diffMin} minutes ago`;
    } else if (diffHour === 1) {
      return 'about 1 hour ago';
    } else if (diffDay < 1) {
      return `about ${diffHour} hours ago`;
    } else if (diffDay === 1) {
      return '1 day ago';
    } else {
      return `${diffDay} days ago`;
    }
  }

  goTimer() {
    this.change.emit('timer');
  }
}
