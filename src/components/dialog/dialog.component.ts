import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  template: `<h1 mat-dialog-title>Edit Section</h1>
  <div mat-dialog-content>
    <p>Choose what data appears in this section</p>
    <div class="w-full flex flex-col">
      <mat-form-field class="w-full">
        <mat-label>{{data?.fieldName}}</mat-label>
        <input matInput [(ngModel)]="data.inputName">
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>Description</mat-label>
        <textarea rows="9" matInput [(ngModel)]="data.description"></textarea>
      </mat-form-field>
    </div>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="data">Confirm</button>
  </div>`,
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
