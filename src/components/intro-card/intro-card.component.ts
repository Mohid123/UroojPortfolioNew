import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from '../main-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { db } from '../../db';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-intro-card',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatTooltipModule,
    DialogComponent
  ],
  template: `
  <div class="h-auto text-white mt-20 bg-inherit flex flex-col justify-between relative w-full">
    <div class="lg:w-[45%] w-full">
      <p class="text-5xl font-semibold">
        {{data()?.inputName}}
      </p>
      <p class="text-xl mt-4">
        {{data()?.description}}
      </p>
      <button *ngIf="gen.isLoggedIn()" (click)="openDialog(data()?.inputName, data()?.description)" matTooltip="Edit Section" mat-icon-button aria-label="Example icon-button with heart icon" class="absolute -top-2 right-0">
        <mat-icon>edit</mat-icon>
      </button>
    </div>
    <div class="absolute top-40 lg:left-[60%] md:left-10 -left-16 lg:block hidden">
      <div class="night">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './intro-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroCardComponent {
  public destroyRef = inject(DestroyRef);
  data: any = signal({});
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog, public gen: GenericService) {
    this.fetchIntroSection();
  }

  fetchFromFirestore() {
    const itemCollection = collection(this.firestore, 'IntroSection');
    let item$ = collectionData(itemCollection);
    item$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (val) => {
      this.data.set(val[0]);
      let data = {
        id: 1,
        inputName: val[0]['inputName'],
        description: val[0]['description']
      }
      await db.addData(data)
    })
  }

  async fetchIntroSection() {
    let dataFromDB = await db.fetchIntroData(1);
    if(dataFromDB) {
      this.data.set(dataFromDB);
    }
    else {
      this.fetchFromFirestore()
    }
  }

  openDialog(inputName: string, description: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        fieldName: 'Name',
        inputName: inputName,
        description: description
      },
      disableClose: true,
      width: '700px'
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (result) => {
      if(result.inputName) {
        let data = {
          id: 1,
          inputName: result?.inputName,
          description: result?.description
        }
        let dataExists = await db.fetchIntroData(1);
        if(dataExists) {
          await db.updateData(data).then((res: any) => {
            if(res) {
              this.fetchIntroSection();
            }
          });
          const ref = doc(this.firestore, "IntroSection", 'h2A8EhjBHjvIk5qUCkgJ');
          await updateDoc(ref, {
            inputName: result?.inputName,
            description: result?.description
          });
        }
        else {
          await db.addData(data).then((res: any) => {
            if(res) {
              this.fetchIntroSection()
            }
          })
        }
      }
    })
  }
}
