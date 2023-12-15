import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditorDialogComponent } from '../editor-dialog/editor-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from '@ckeditor/ckeditor5-core';
import { GenericService } from '../../services/generic.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    CKEditorModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
  <h5 class="lg:text-5xl text-4xl font-semibold text-center text-white mb-5">
    My Projects <button *ngIf="gen.isLoggedIn()" (click)="openDialogAddOnly()"><mat-icon>add_circle</mat-icon></button>
  </h5>
  <!-- <ckeditor [editor]="Editor" [config]="editorConfig"></ckeditor> -->
  <div class="grid grid-cols-12 gap-6 text-white">
    @for (project of projects(); track project.id; let index = $index) {
      <div class="bg-[#1A2421] rounded-xl px-5 py-4 lg:col-span-4 md:col-span-6 col-span-full relative">
        <button *ngIf="gen.isLoggedIn()" (click)="openDialog(project?.content, project?.id)" matTooltip="Edit card" mat-icon-button aria-label="Example icon-button with share icon" class="absolute -top-5 right-0 z-10">
          <mat-icon class="p-4 rounded-full bg-gray-400 flex items-center justify-center">edit</mat-icon>
        </button>
        <mat-icon>verified</mat-icon>
        <div [ngClass]="readMore ? 'overflow-visible': 'h-102 overflow-clip'">
          <div [innerHTML]="project?.content"></div>
        </div>
        <p class="my-2 text-sm text-blue-300 flex justify-start cursor-pointer" (click)="readMore = !readMore">Read {{readMore ? 'Less': 'More'}}</p>
        <div class="flex justify-end">
          <mat-icon class="my-3">workspace_premium</mat-icon>
        </div>
      </div>
    }
  </div>
  `,
  styleUrl: './blog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  public destroyRef = inject(DestroyRef);
  firestore: Firestore = inject(Firestore);
  projects = signal<any>([]);
  public Editor = ClassicEditor;
  public editorConfig: EditorConfig = {
    toolbar: {
      items: [
        'heading',
				'bold',
				'italic',
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
				'selectAll',
        'link'
      ]
		}
  };
  public readMore: boolean = false;

  constructor(public dialog: MatDialog, public gen: GenericService) {
    this.fetchFromFirestore()
  }

  async fetchFromFirestore() {
    const itemCollection = collection(this.firestore, 'Projects');
    let val = await getDocs(itemCollection);
    let projects: any = [];
    val.forEach(item => {
      let data = {
        id: item.id,
        content: item.get('content')
      }
      projects.push(data)
    })
    this.projects.set(projects)
  }

  openDialog(content: any, id: string) {
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      data: {
        content: content
      },
      disableClose: true,
      width: '900px',
      height: '600px'
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (val) => {
      if(val) {
        const ref = doc(this.firestore, "Projects", id);
        await updateDoc(ref, val).then(() => {
          this.fetchFromFirestore()
        });
      }
    })
  }

  openDialogAddOnly() {
    const dialogRef = this.dialog.open(EditorDialogComponent, {
      data: {
        content: ''
      },
      disableClose: true,
      width: '900px',
      height: '600px'
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (val) => {
      if(val) {
        const ref = collection(this.firestore, "Projects");
        await addDoc(ref, val).then(() => {
          this.fetchFromFirestore()
        });
      }
    })
  }
}

/**
 * blogs: any[] = [
    {
      id: 1,
      title: '15 Places To Get the Best Burgers in Islamabad',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/05/Best-burgers-in-Islamabad1-1024x400.jpg',
      source: 'https://blogpakistan.pk/burgers-in-islamabad/',
      summary: `Burgers are popular fast food items that keep one full for hours. If you are a burger fan and want to try out the
      best burgers in Islamabad, here are 15 suggestions that won’t disappoint!`
    },
    {
      id: 2,
      title: 'List of Libraries in Lahore: Timings, Membership, Contact Details',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/02/Libraries-in-Lahore-1-1024x400.jpg',
      source: 'https://blogpakistan.pk/libraries-in-lahore/',
      summary: `Libraries are storehouses of knowledge that can never lose their importance. If you are looking for a library in Lahore, we are here with 10 popular options with their details.`
    },
    {
      id: 3,
      title: 'A Beginner-Friendly Skincare Routine: 3-Step Practical Guide',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/05/skincare-routine1-1024x400.jpg',
      source: 'https://blogpakistan.pk/skincare-routine-for-glowing-skin/',
      summary: `Skincare is an important habit that every individual should consider. If you are a beginner looking for some inspiration to build a
      skincare routine, here are 3 basic steps to start with.`
    },
    {
      id: 4,
      title: 'How To Send Money from Jazz Cash to Easy Paisa: 3 Simple Methods',
      img: 'https://startuppakistan.com.pk/wp-content/uploads/2022/01/word-image-135.jpeg',
      source: 'https://blogpakistan.pk/prices/how-to-send-money-from-jazz-cash-to-easy-paisa/',
      summary: `Introduced in 2012, JazzCash has now become the largest digital wallet in the country. If you want to know how to send money from JazzCash to Easypaisa,
      we are here with all the methods and details.`
    },
    {
      id: 5,
      title: 'Hajj 2022: Quota, Cost, and Application Deadline',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/05/HAJJ-APPLICATIONS1-1024x400.jpg',
      source: 'https://blogpakistan.pk/hajj-applications-are-open-in-pakistan-for-hajj-2022/',
      summary: `The Government of Pakistan has announced the opening of Hajj Applications for the year 2022. The applications
      will remain open from May 1 to May 13. A total of 81,132 pilgrims will get the chance to perform Hajj from Pakistan with 40%
      from government schemes and 60% from private.`
    },
    {
      id: 6,
      title: '30 Best Places to Get Iftar Buffet in Islamabad - 2022',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/05/Best-burgers-in-Islamabad1-1024x400.jpg',
      source: 'https://blogpakistan.pk/iftar-buffet-in-islamabad/',
      summary: `Ramadan is one of the most loved and celebrated months in the Islamic calendar. If you live in Islamabad or are in the city for a few days, here are some
      restaurants and cafes for the best Iftar Buffet in Islamabad.`
    },
  ]
 */

  /**
   * <div class="relative mb-3 aspect-square">
        <img
          [src]="project.img"
          alt="project_img"
          class="aspect-video object-cover lg:h-full h-[500px]"
        >
        <div class="absolute top-2">
          <p class="text-white font-semibold backdrop-blur-lg bg-black/50 px-3 py-1">
            {{project.title}}
          </p>
        </div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <a
            [href]="project.source"
            target="_blank"
            class="text-white font-semibold backdrop-blur-lg bg-black/70 px-3 py-1 rounded-xl"
          >
            Read Here!
          </a>
        </div>
        <div class="absolute bottom-0">
          <p class="text-white backdrop-blur-lg bg-black/50 px-3 py-1 text-sm">
            {{project.summary}}
          </p>
        </div>
      </div>
   */
