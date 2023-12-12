import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PublicDialogComponent } from '../public-dialog/public-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Firestore } from '@angular/fire/firestore';
import { GenericService } from '../../services/generic.service';
import { db } from '../../db';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

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
    @for (item of items(); track item.id; let index = $index) {
      <div [ngClass]="index == 0 ? 'bg-[#34ABFF]/30' : 'bg-[#B8130D]/30'" class="backdrop-blur-xl px-5 py-4 rounded-xl lg:w-96 w-full flex justify-center items-center flex-col relative">
        <button (click)="openDialog(item)" matTooltip="Edit card" mat-icon-button aria-label="Example icon-button with share icon" class="absolute -top-5 right-0">
          <mat-icon class="p-4 rounded-full bg-gray-400 flex items-center justify-center">edit</mat-icon>
        </button>
        <div class="w-20 h-20 rounded-full border-4" [ngClass]="index == 0 ? 'border-[#34ABFF]' : 'border-[#B8130D]'">
          <img [src]="item?.img" alt="inf_logo" class="object-contain w-full h-full rounded-full">
        </div>
        <a [href]="item?.url" target="_blank" class="text-xl font-semibold text-white">
          {{item?.title}}
          <ng-container *ngIf="index == 0">
            <mat-icon class="mt-3 -mb-1">facebook</mat-icon>
          </ng-container>
          <ng-container *ngIf="index > 0">
            <mat-icon svgIcon="instagram" class="mt-3 -mb-1"></mat-icon>
          </ng-container>
        </a>
        <p class="mt-5 text-white">
          {{item?.description}}
        </p>
      </div>
    }
    @empty {
      <p class="text-lg text-center my-5 text-white font-semibold"> There are no items. </p>
    }
  </div>`,
  styleUrl: './public-pages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicPagesComponent {
  public destroyRef = inject(DestroyRef);
  firestore: Firestore = inject(Firestore);
  file: any;
  items = signal<any>([]);
  collectionID!: string;

  constructor(public dialog: MatDialog, private gen: GenericService) {
    this.fetchPublicSection();
    this.gen.emitFileEvent.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(val => {
      this.file = val;
    })
  }

  async fetchPublicSection() {
    let dataFromDB = await db.fetchPublicPageData();
    if(dataFromDB?.length > 0) {
      this.items.set(dataFromDB);
    }
    else {
      this.fetchFromFirestore()
    }
  }

  async fetchFromFirestore() {
    const itemCollection = collection(this.firestore, 'PublicSection');
    let val = await getDocs(itemCollection);
    val.forEach(async item => {
      let data = {
        id: item.id,
        uid: item?.get('uid'),
        title: item.get('title'),
        description: item.get('description'),
        img: item.get('img'),
        url: item.get('url')
      }
      await db.addPublicData(data)
    })
    this.items.set(val.docs?.map(doc => doc.data()))
  }

  openDialog(item: any) {
    const dialogRef = this.dialog.open(PublicDialogComponent, {
      data: {
        id: item?.id,
        uid: item?.uid,
        title: item?.title,
        url: item?.url,
        description: item?.description
      },
      disableClose: true,
      width: '700px'
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (val) => {
      if(val?.title) {
        let data = {
          ...val,
          img: this.file || item?.img
        }
        await db.updatePublicData(data).then((res: any) => {
          if(res) {
            this.fetchPublicSection()
          }
        })
        const ref = doc(this.firestore, 'PublicSection', item?.id);
        await updateDoc(ref, data);
      }
    })
  }
}
