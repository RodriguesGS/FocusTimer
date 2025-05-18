import { Component } from '@angular/core';
import { TimerComponent } from './components/timer/timer.component';
import { HistoryComponent } from "./components/history/history.component";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerComponent, HistoryComponent],
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

  changeWindow(window: 'history' | 'timer') {
    this.activeWindow = window;
  }
}
