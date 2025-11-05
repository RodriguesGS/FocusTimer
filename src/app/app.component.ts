import { Component } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent, HistoryItem } from "./components/history/history.component";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-root',
    imports: [
        TimerComponent,
        HistoryComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [
        trigger('fade', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms', style({ opacity: 1 }))
            ]),
        ])
    ]
})
export class AppComponent {
  activeWindow: 'history' | 'timer' = 'timer';
  history: HistoryItem[] = [];

  timerState = {
    isRunning: false,
    totalSeconds: 0,
    task: '',
    intervalId: null as number | null
  };

  startTimer({ minutes, task }: { minutes: number, task: string }) {
    this.timerState.isRunning = true;
    this.timerState.totalSeconds = minutes * 60;
    this.timerState.task = task;

    if (this.timerState.intervalId) {
      clearInterval(this.timerState.intervalId);
    }

    this.timerState.intervalId = setInterval(() => {
      if (this.timerState.totalSeconds > 0) {
        this.timerState.totalSeconds--;

        const min = Math.floor(this.timerState.totalSeconds / 60).toString().padStart(2, '0');
        const sec = (this.timerState.totalSeconds % 60).toString().padStart(2, '0');

        document.title = `${min}:${sec} |  Focus Timer`;
      } else {
        this.timerState.isRunning = false;

        if (this.timerState.intervalId) {
          clearInterval(this.timerState.intervalId);
          this.timerState.intervalId = null;
        }

        document.title = 'Focus Timer';

        if (this.history.length > 0 && this.history[0].status === 'In progress') {
          this.history[0].status = 'Concluded';
        }   
      }
    }, 1000) as unknown as number;
  }

  stopTimer() {
    this.timerState.isRunning = false;

    this.timerState.totalSeconds = 0;

    if (this.timerState.intervalId) {
      clearInterval(this.timerState.intervalId);
      this.timerState.intervalId = null;
    }

    this.history[0].status = 'Interrupted';

    document.title = 'Focus Timer';
  }

  changeWindow(window: 'history' | 'timer') {
    this.activeWindow = window;
  }

  addItem(item: HistoryItem) {
    this.history.unshift(item);
  }

  updateStatus(event: { index: number, status: 'Interrupted' | 'Concluded' }) {
    if (this.history[event.index]) {
      this.history[event.index].status = event.status;
    }   
  }
}