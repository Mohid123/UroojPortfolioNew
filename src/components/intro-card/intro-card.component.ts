import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { db } from '../../db';

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
  <div class="h-auto text-white mt-28 bg-inherit flex flex-col justify-between relative w-full">
    <div class="lg:w-[40%] w-full">
      <p class="lg:text-5xl text-3xl font-semibold">
        {{data()?.inputName}}
      </p>
      <p class="text-xl mt-4">
        {{data()?.description}}
      </p>
      <button (click)="openDialog(data()?.inputName, data()?.description)" matTooltip="Edit Section" mat-icon-button aria-label="Example icon-button with heart icon" class="absolute -top-2 right-0">
        <mat-icon>edit</mat-icon>
      </button>
    </div>
    <div class="absolute top-40 right-[40%]">
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
  inputName!: string;
  description!: string;
  data: any = signal({})

  constructor(public dialog: MatDialog) {
    this.fetchIntroSection();
  }

  async fetchIntroSection() {
    let dataFromDB = await db.fetchIntroData(1);
    this.data.set(dataFromDB);
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
              this.fetchIntroSection()
            }
          })
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
