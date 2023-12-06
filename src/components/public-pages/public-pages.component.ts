import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PublicDialogComponent } from '../public-dialog/public-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Firestore } from '@angular/fire/firestore';

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
    <div class="backdrop-blur-xl bg-[#34ABFF]/30 px-5 py-4 rounded-xl lg:w-96 w-full flex justify-center items-center flex-col relative">
      <button (click)="openDialog(data()?.title, data()?.description, 'fb')" matTooltip="Edit card" mat-icon-button aria-label="Example icon-button with share icon" class="absolute -top-5 right-0">
        <mat-icon class="p-4 rounded-full bg-gray-400 flex items-center justify-center">edit</mat-icon>
      </button>
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
    <div class="backdrop-blur-xl bg-[#B8130D]/30 px-5 py-4 rounded-xl lg:w-96 w-full flex justify-center items-center flex-col relative">
      <button (click)="openDialog(data()?.title, data()?.description, 'insta')" matTooltip="Edit card" mat-icon-button aria-label="Example icon-button with share icon" class="absolute -top-5 right-0">
        <mat-icon class="p-4 rounded-full bg-gray-400 flex items-center justify-center">edit</mat-icon>
      </button>
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
  public destroyRef = inject(DestroyRef);
  data: any = signal({});
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {}

  openDialog(title: string, description: string, type: string) {
    const dialogRef = this.dialog.open(PublicDialogComponent, {
      data: {
        title: title,
        description: description
      },
      disableClose: true,
      width: '700px'
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => console.log(val))
  }
}
