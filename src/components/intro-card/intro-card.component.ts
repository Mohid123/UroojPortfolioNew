import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, DestroyRef, Signal, signal, effect } from '@angular/core';
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
  <div class="w-full h-auto text-white mt-20 shadow-lg bg-[#463c14] flex items-center relative">
    <button (click)="openDialog(data()?.inputName, data()?.description)" matTooltip="Edit section" mat-icon-button aria-label="Example icon-button with share icon" class="absolute -top-5 right-0">
      <mat-icon class="p-4 rounded-full bg-gray-400 flex items-center justify-center">mode_edit_outline</mat-icon>
    </button>
    <div class="grid grid-cols-12 gap-x-5 w-full mx-6 py-3">
      <div class="md:col-span-4 col-span-full py-8">
        <p class="md:text-5xl text-4xl font-semibold">
          {{data()?.inputName}}
        </p>
        <p class="md:text-xl text-lg mt-3">
          {{data()?.description}}
        </p>
      </div>
      <div class="col-span-2 md:block hidden"></div>
      <div class="md:col-span-6 col-span-full md:justify-self-end flex items-center">
        <img ngSrc="../../assets/write.jpg" width="600" height="400" alt="writer" priority class="object-contain">
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
        await db.addData(data)
      }
    })
  }
}
