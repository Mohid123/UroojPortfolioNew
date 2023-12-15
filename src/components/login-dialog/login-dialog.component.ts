import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login-dialog',
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
    MatDialogContent,
    MatIconModule
  ],
  template: `
  <h4 mat-dialog-title class="text-center">Authentication</h4>
  <div mat-dialog-content>
    <p>Login with email & password</p>
    <div class="w-full flex flex-col">
      <mat-form-field class="w-full">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.email"/>
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>Password</mat-label>
        <input type="password" matInput [type]="hide ? 'password' : 'text'" [(ngModel)]="data.password"/>
        <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
      </mat-form-field>
    </div>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="data">Confirm</button>
  </div>`,
  styleUrl: './login-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  hide = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
