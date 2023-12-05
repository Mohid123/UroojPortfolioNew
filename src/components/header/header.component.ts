import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    NgOptimizedImage,
    RouterModule
  ],
  template: `
  <mat-toolbar color="warn" class="fixed top-0 left-0 z-20">
    <mat-toolbar-row>
      <div class="flex flex-col">
        <img matTooltip="Ursa Minor" ngSrc="../../assets/ursa-minor-bg.gif" width="80" height="80" priority>
      </div>
      <!-- <span class="example-spacer"></span>
      <div class="flex justify-center">
        <img ngSrc="../../assets/welcome.gif" width="60" height="60">
      </div> -->
      <span class="example-spacer"></span>
      <div class="flex gap-x-5">
        <button [routerLink]="['/home']" routerLinkActive="active" matTooltip="Home" mat-icon-button aria-label="Example icon-button with heart icon">
          <mat-icon>home</mat-icon>
        </button>
        <button [routerLink]="['/projects']" routerLinkActive="active"  matTooltip="Projects" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>folder_zip</mat-icon>
        </button>
        <!-- <button matTooltip="Featured Blogs & Articles" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>newspaper</mat-icon>
        </button> -->
        <button matTooltip="Login" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>login</mat-icon>
        </button>
      </div>
    </mat-toolbar-row>
  </mat-toolbar>
  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
