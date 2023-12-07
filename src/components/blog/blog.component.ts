import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <h5 class="lg:text-5xl text-4xl font-semibold text-center text-white mb-5">My Blog</h5>
  <div class="lg:columns-3 md:columns-2 columns-1 gap-6">
    @for (blog of blogs; track blog.id; let index = $index) {
      <div class="relative mb-3 aspect-square">
        <img
          [src]="blog.img"
          alt="blog_img"
          class="aspect-video object-cover lg:h-full h-[500px]"
        >
        <div class="absolute top-2">
          <p class="text-white font-semibold backdrop-blur-lg bg-black/50 px-3 py-1">
            {{blog.title}}
          </p>
        </div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <a
            [href]="blog.source"
            target="_blank"
            class="text-white font-semibold backdrop-blur-lg bg-black/70 px-3 py-1 rounded-xl"
          >
            Read Here!
          </a>
        </div>
        <div class="absolute bottom-0">
          <p class="text-white backdrop-blur-lg bg-black/50 px-3 py-1 text-sm">
            {{blog.summary}}
          </p>
        </div>
      </div>
    }
  </div>
  `,
  styleUrl: './blog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  blogs: any[] = [
    {
      id: 1,
      title: '15 Places To Get the Best Burgers in Islamabad',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/05/Best-burgers-in-Islamabad1-1024x400.jpg',
      source: 'https://blogpakistan.pk/burgers-in-islamabad/',
      summary: `Burgers are popular fast food items that keep one full for hours. They are juicy, tasty, and a combination,
      of delicious meat, sauces, and buns that are a match made in heaven. If you are a burger fan and want to try out the
      best burgers in Islamabad, here are 15 suggestions that won’t disappoint!`
    },
    {
      id: 2,
      title: 'List of Libraries in Lahore: Timings, Membership, Contact Details',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/02/Libraries-in-Lahore-1-1024x400.jpg',
      source: 'https://blogpakistan.pk/libraries-in-lahore/',
      summary: `Libraries are storehouses of knowledge that can never lose their importance. From the peaceful ambiance to an
      unlimited supply of knowledge, libraries are a reader’s heaven. In Pakistan, multiple libraries in the major cities offer
      access to the general public. If you are looking for a library in Lahore, we are here with 10 popular options with their details.`
    },
    {
      id: 3,
      title: 'A Beginner-Friendly Skincare Routine: 3-Step Practical Guide',
      img: 'https://blogpakistan.pk/wp-content/uploads/2022/05/skincare-routine1-1024x400.jpg',
      source: 'https://blogpakistan.pk/skincare-routine-for-glowing-skin/',
      summary: `Skincare is an important habit that every individual should consider. Keeping skin healthy and well-treated not
      only makes it look younger but also makes you more confident. If you are a beginner looking for some inspiration to build a
      skincare routine, here are 3 basic steps to start with.`
    },
    {
      id: 4,
      title: 'How To Send Money from Jazz Cash to Easy Paisa: 3 Simple Methods',
      img: 'https://startuppakistan.com.pk/wp-content/uploads/2022/01/word-image-135.jpeg',
      source: 'https://blogpakistan.pk/prices/how-to-send-money-from-jazz-cash-to-easy-paisa/',
      summary: `Introduced in 2012, JazzCash has now become the largest digital wallet in the country. It has millions of
      active customers who benefit from its features. If you want to know how to send money from JazzCash to Easypaisa,
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
      summary: `Ramadan is one of the most loved and celebrated months in the Islamic calendar. While home food is comfortable, there are multiple places you
      can visit to have the best Iftar experience. If you live in Islamabad or are in the city for a few days, here are some
      restaurants and cafes for the best Iftar Buffet in Islamabad.`
    },
  ]
}
