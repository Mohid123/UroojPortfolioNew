import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-public-dialog',
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
  template: `<h4 mat-dialog-title>Edit Section</h4>
  <div mat-dialog-content>
    <div class="w-full flex flex-col">
      <mat-form-field class="w-full">
        <mat-label>Title</mat-label>
        <input matInput [(ngModel)]="data.title">
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>URL</mat-label>
        <input matInput [(ngModel)]="data.url">
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>Description</mat-label>
        <textarea rows="9" matInput [(ngModel)]="data.description"></textarea>
      </mat-form-field>
      <div class="my-3">
        <label class="block mb-2 text-sm font-medium text-white" for="file_input">Upload file</label>
        <input (change)="onFileSelect($event)" accept="image/*" class="block w-full text-sm border rounded-lg cursor-pointer bg-gray-300 text-gray-400 focus:outline-none border-gray-600 placeholder-gray-200" id="file_input" type="file">
      </div>
    </div>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="data">Confirm</button>
  </div>`,
  styleUrl: './public-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicDialogComponent {
  fileBlob: string | ArrayBuffer | null = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private gen: GenericService) {}

  onFileSelect(event: any) {
    let file = event.target.files[0];
    let fileSize = Math.round(file?.size)/1024;
    if(fileSize >= 2048) {
      file = null;
      return alert('File size cannot exceed 2mb')
    }
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.fileBlob = reader.result;
      this.gen.emitFileEvent.emit(this.fileBlob)
    })
    reader.readAsDataURL(file);
  }
}
