import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { db } from '../db';
import { interval, take } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
  constructor(swUpdate: SwUpdate) {
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    everySixHours$.pipe(take(1)).subscribe(async () => {
      try {
        swUpdate.activateUpdate().then(() => {
          console.log('New version available. Refreshing...');
          db.publicSectionData.clear()
          db.introSectionData.clear()
          db.quoteSectionData.clear()
          document.location.reload();
          console.log('Refresh after 12 seconds');
        })
      } catch (err) {
        console.error('Failed to refresh:', err);
      }
    });
  }
}
