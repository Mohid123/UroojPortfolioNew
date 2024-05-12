import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  providers: [MatIconRegistry],
  template: `
  <div class="mt-14 border-t border-white w-full pt-4 text-center text-white bg-[#F44336]">
      <p class="text-xl font-semibold text-white">Urooj Murtaza.</p>
      <p class="text-sm font-semibold text-white">Data Scientist & Astronomer</p>
      <div class="flex justify-center gap-x-3 mt-4">
          <a href="https://github.com/uroojmurtaza" target="_blank">
            <mat-icon svgIcon="github"></mat-icon>
          </a>
          <a href="https://www.linkedin.com/m/profile/in/urooj-murtaza-8b213a166" target="_blank">
            <mat-icon svgIcon="linkedin"></mat-icon>
          </a>
          <a href="mailto:uroojmurtazaa@gmail.com" target="_blank">
            <mat-icon>email</mat-icon>
          </a>
      </div>
      <p class="text-sm font-semibold mt-4 text-white">&copy; 2024 Urooj Murtaza. All Rights Reserved</p>
  </div>
  `,
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/instagram.svg'
      )
    ),
    this.matIconRegistry.addSvgIcon(
      'linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/linkedin.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/github.svg'
      )
    );
  }
}
