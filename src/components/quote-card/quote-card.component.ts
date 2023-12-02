import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { db } from '../../db';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    NgOptimizedImage,
    DialogComponent
  ],
  template: `
  <div class="w-full h-auto text-white shadow-lg bg-[#463c14] flex items-center relative">
    <button (click)="openDialog(data()?.quote, data()?.writer)" matTooltip="Edit section" mat-icon-button aria-label="Example icon-button with share icon" class="absolute -top-5 right-0">
      <mat-icon class="p-4 rounded-full bg-gray-400 flex items-center justify-center">edit</mat-icon>
    </button>
    <div class="grid grid-cols-12 gap-x-5 w-full mx-6 py-3">
      <div class="md:col-span-6 col-span-full py-8 lg:flex lg:flex-col lg:justify-center lg:items-center">
        <q class="text-3xl">
          {{data()?.quote}}
        </q>
        <i class="md:text-xl text-lg mt-3 block">
          - {{data()?.writer}}
        </i>
      </div>
      <div class="md:col-span-6 col-span-full md:justify-self-end flex items-center">
        <img ngSrc="../../assets/write.jpg" width="600" height="400" alt="writer" priority class="object-contain">
      </div>
    </div>
  </div>
  `,
  styleUrl: './quote-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteCardComponent {
  constructor(public dialog: MatDialog) {
    this.fetchQuoteSection();
  }

  public destroyRef = inject(DestroyRef);
  data: any = signal({})

  async fetchQuoteSection() {
    let dataFromDB = await db.fetchQuote(1);
    this.data.set(dataFromDB);
  }

  openDialog(inputName: string, description: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        fieldName: 'Quote',
        secondField: 'Author of Quote',
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
          quote: result?.inputName,
          writer: result?.description
        }
        let dataExists = await db.fetchQuote(1);
        if(dataExists) {
          await db.updateQuote(data).then((res: any) => {
            if(res) {
              this.fetchQuoteSection()
            }
          })
        }
        else {
          await db.addQuote(data).then((res: any) => {
            if(res) {
              this.fetchQuoteSection()
            }
          })
        }
      }
    })
  }
}
