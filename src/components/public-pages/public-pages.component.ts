import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-public-pages',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  template: `
  <h3 class="lg:text-5xl text-4xl font-semibold text-center text-white mb-5">Public Pages</h3>
  <div class="flex justify-center lg:flex-row flex-col gap-5">
    <div class="backdrop-blur-xl bg-[#34ABFF]/30 px-5 py-4 rounded-xl lg:w-96 w-full flex justify-center items-center flex-col">
      <div class="w-20 h-20 rounded-full border-4 border-[#34ABFF]">
        <img src="../../assets/inf_logo.jpg" alt="inf_logo" class="object-contain w-full h-full rounded-full">
      </div>
      <a href="https://m.facebook.com/infinity.sailors/?ref=bookmarks" target="_blank" class="text-xl font-semibold text-white">
        Infinity Sailors <mat-icon class="mt-3 -mb-1">facebook</mat-icon>
      </a>
      <p class="mt-5 text-white">
        This page intends to share information about astronomy-related facts and encourage out-of-the-box thinking.
        We are a team of 7 amateur astronomers from the Institute of Space Technology, Pakistan hoping to improve your
        understanding of the Cosmos!!
      </p>
    </div>
    <div class="backdrop-blur-xl bg-[#B8130D]/30 px-5 py-4 rounded-xl lg:w-96 w-full flex justify-center items-center flex-col">
      <div class="w-20 h-20 rounded-full border-4 border-[#B8130D]">
        <img src="../../assets/inf_logo.jpg" alt="inf_logo" class="object-contain w-full h-full rounded-full">
      </div>
      <a href="https://www.instagram.com/infinitysailors/" target="_blank" class="text-xl font-semibold text-white">
        Infinity Sailors <mat-icon svgIcon="instagram" class="mt-3 -mb-1">instagram</mat-icon>
      </a>
      <p class="mt-5 text-white">
        This page intends to share information about astronomy-related facts and encourage out-of-the-box thinking.
        We are a team of 7 amateur astronomers from the Institute of Space Technology, Pakistan hoping to improve your
        understanding of the Cosmos!!
      </p>
    </div>
  </div>`,
  styleUrl: './public-pages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicPagesComponent {
}
