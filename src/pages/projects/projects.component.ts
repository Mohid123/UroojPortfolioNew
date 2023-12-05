import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule
  ],
  providers: [MatIconRegistry],
  template: `
  <app-header></app-header>
  <h3 class="mt-24 lg:text-5xl text-4xl text-center text-white font-semibold">Projects</h3>
  <div class="flex justify-center lg:flex-row flex-col gap-5 mt-6 lg:mx-10 mx-2">
    <div class="flex flex-col items-center justify-center bg-[#463C14] text-[#F9F6EE] px-4 rounded-xl">
      <div class="px-4 mt-3">
        <img src="../../assets/gamma.webp" alt="gamma.webp" class="object-cover rounded-xl">
      </div>
      <p class="text-2xl font-semibold my-5">Temporal Analysis of Gamma Ray Bursts</p>
      <p class="text-lg font-semibold">Astronomy Final Year Project</p>
      <p class="my-4">
      Gamma-Ray Bursts (GRBs) are one of the highest energy events in the universe but little is known about them.
      The sources and the mechanisms of emission have been studied for many years but are still not very clearly understood.
      The temporal profiles of Gamma-Ray Burst can provide clues about the very nature of GRBs.
      In this project we aimed to find the temporal characteristics of the Gamma-Ray Burst 190114C which is a recently detected
      GRB in the Tera-electron Volt (TeV) energy range. The temporal profile of this GRB hasn't been studied in detail as of now.
      For our analysis we have used data from the Fermi Gamma-Ray Space Telescope, have utilized softwares like Rmfit for
      background-fitting and Pyroot along with Norris- 2005 temporal model for curve-fitting procedures.
      The time evolution of the GRB 190141C suggested that width of a pulse increases and amplitude decreases with time.
      We also got an inverse relationship between the rise and fall duration of a pulse and no correlation between the pulse
      width and asymmetry
      </p>
    </div>
    <div class="flex flex-col items-center justify-center bg-[#463C14] text-[#F9F6EE] px-4 rounded-xl">
      <div class="px-4 mt-3">
        <img src="../../assets/drought.webp" alt="drought.jpg" class="w-full object-cover rounded-xl">
      </div>
      <p class="text-2xl font-semibold my-5">Droughts in Pakistan</p>
      <p class="text-lg font-semibold">GIS Internship Project</p>
      <p class="my-4">
      Pakistan has a history of droughts, most notable was during the period 1998-2000. The Southern parts of the country
      below 30ºN, particularly parts of Southern Punjab, Sindh & Balochistan, are the most vulnerable regions to droughts in Pakistan.
      Because of the long latitudinal extent of the country from 24ºN to 37ºN, the country has a diversified climate which consist
      mostly of arid and semiarid regions, besides some hyper arid regions. On account of the natural deserts within 25º to 30ºN
      there are two rainy seasons namely winter (December to March) and summer monsoons (June to September) and two transition
      periods having almost insignificant rains. The rainfall pattern is highly variable and climate change might have adverse impact
      on the drought conditions in Pakistan
      </p>
    </div>
  </div>
  <app-footer></app-footer>
  `,
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
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
}
