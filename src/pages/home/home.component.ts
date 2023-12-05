import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IntroCardComponent } from '../../components/intro-card/intro-card.component';
import * as Aos from 'aos';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';
import { PublicPagesComponent } from '../../components/public-pages/public-pages.component';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    IntroCardComponent,
    QuoteCardComponent,
    PublicPagesComponent,
    HttpClientModule,
    FooterComponent
  ],
  providers: [MatIconRegistry],
  template: `
  <app-header></app-header>
  <section class="mx-12 mt-52">
    <app-intro-card></app-intro-card>
  </section>
  <section class="mt-64 py-20">
    <app-quote-card data-aos="zoom-in"></app-quote-card>
  </section>
  <section class="mt-8">
    <app-public-pages></app-public-pages>
  </section>
  <app-footer></app-footer>
  `,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/instagram.svg'
      )
    ),
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/linkedin.svg'
      )
    );
  }

  ngOnInit(): void {
    Aos.init();
  }
}
