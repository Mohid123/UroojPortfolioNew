import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';

@Component({
  selector: 'app-editor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    CKEditorModule
  ],
  template: `<h4 mat-dialog-title>Add/Edit Project</h4>
  <div mat-dialog-content>
    <div class="w-full flex flex-col my-5 h-full">
      <mat-label class="mb-2">Content</mat-label>
      <ckeditor [editor]="Editor" [config]="editorConfig" [(ngModel)]="data.content" class="h-full text-black"></ckeditor>
    </div>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="data">Confirm</button>
  </div>`,
  styleUrl: './editor-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorDialogComponent {
  public Editor = ClassicEditor;
  public editorConfig: EditorConfig = {
    toolbar: {
      items: [
        'heading',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'|',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'undo',
				'redo',
				'selectAll'
      ]
		}
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
