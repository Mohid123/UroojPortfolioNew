import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IntroCardComponent } from '../../components/intro-card/intro-card.component';
import { QuoteCardComponent } from '../../components/quote-card/quote-card.component';
import { PublicPagesComponent } from '../../components/public-pages/public-pages.component';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { BlogComponent } from '../../components/blog/blog.component';

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
    FooterComponent,
    BlogComponent
  ],
  providers: [MatIconRegistry],
  template: `
  <app-header></app-header>
  <section class="lg:mx-12 mx-2 mt-52">
    <app-intro-card></app-intro-card>
  </section>
  <!-- <section class="lg:mt-64 mt-28 py-20">
    <app-quote-card></app-quote-card>
  </section> -->
  <section class="lg:mt-64 mt-28 mx-2">
    <app-blog></app-blog>
  </section>
  <!-- <section class="mt-14 lg:mx-12 mx-2">
    <app-public-pages></app-public-pages>
  </section> -->
  <app-footer></app-footer>
  `,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
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
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/github.svg'
      )
    );
  }
}
