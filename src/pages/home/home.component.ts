import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IntroCardComponent } from '../../components/intro-card/intro-card.component';
import * as Aos from 'aos';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    IntroCardComponent,
    QuoteCardComponent
  ],
  template: `
  <app-header></app-header>
  <section class="mx-12 mt-52">
    <app-intro-card></app-intro-card>
  </section>
  <section class="mt-96 py-20">
    <app-quote-card data-aos="zoom-in"></app-quote-card>
  </section>
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
