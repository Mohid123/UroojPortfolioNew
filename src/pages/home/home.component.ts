import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IntroCardComponent } from '../../components/intro-card/intro-card.component';
import Aos from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    IntroCardComponent
  ],
  template: `
  <app-header></app-header>
  <app-intro-card></app-intro-card>
  `,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    Aos.init();
  }
}
