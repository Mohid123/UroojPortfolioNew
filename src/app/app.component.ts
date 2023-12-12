import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { db } from '../db';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Portfolio';
  constructor() {
    // window.onload = (event) => {
    //   db.publicSectionData.clear()
    //   db.introSectionData.clear()
    //   db.quoteSectionData.clear()
    // }
  }
}
