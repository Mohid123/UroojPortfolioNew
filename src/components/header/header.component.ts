import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { GenericService } from '../../services/generic.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    NgOptimizedImage,
    RouterModule,
    MatSnackBarModule
  ],
  template: `
  <mat-toolbar color="warn" class="fixed top-0 left-0 z-20">
    <mat-toolbar-row>
      <div class="flex flex-col">
        <img matTooltip="Ursa Minor" ngSrc="../../assets/ursa-minor-bg.gif" width="80" height="80" priority>
      </div>
      <!-- <span class="example-spacer"></span>
      <div class="flex justify-center">
        <img ngSrc="../../assets/welcome.gif" width="60" height="60">
      </div> -->
      <span class="example-spacer"></span>
      <div class="flex gap-x-5">
        <button [routerLink]="['/home']" routerLinkActive="active" matTooltip="Home" mat-icon-button aria-label="Example icon-button with heart icon">
          <mat-icon>home</mat-icon>
        </button>
        <button [routerLink]="['/projects']" routerLinkActive="active" matTooltip="Archive" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>folder_zip</mat-icon>
        </button>
        <button matTooltip="Resume" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>description</mat-icon>
        </button>
        <!-- <button matTooltip="Featured Blogs & Articles" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>newspaper</mat-icon>
        </button> -->
        <button *ngIf="!gen.isLoggedIn()" (click)="openDialog()" matTooltip="Login" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>login</mat-icon>
        </button>
        <button *ngIf="gen.isLoggedIn()" (click)="logout()" matTooltip="Logout" mat-icon-button aria-label="Example icon-button with share icon">
          <mat-icon>logout</mat-icon>
        </button>
      </div>
    </mat-toolbar-row>
  </mat-toolbar>
  `,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public destroyRef = inject(DestroyRef);

  constructor(public dialog: MatDialog, public gen: GenericService, private snackBar: MatSnackBar) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      data: {},
      disableClose: true,
      width: '500px'
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (result) => {
      if(result.email && result.password) {
        const auth = getAuth();
        signInWithEmailAndPassword (auth, result.email, result.password)
        .then((userCredential: any) => {
          localStorage.setItem('token', userCredential.user?.accessToken);
          this.gen.isLoggedIn.set(true);
          this.snackBar.open('Authentication Successful', 'Close', {
            duration: 4000
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.snackBar.open(errorMessage, 'Close', {
            duration: 4000
          })
        });
      }
    })
  }

  logout() {
    localStorage.clear();
    this.gen.isLoggedIn.set(false);
    this.snackBar.open('Logged out of current session', 'Close', {
      duration: 4000
    })
  }
}
