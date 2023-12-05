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
  <div class="lg:columns-3 columns-1 gap-6">
    <div class="relative aspect-video duration-500">
      <img
        src="https://blogpakistan.pk/wp-content/uploads/2022/05/Best-burgers-in-Islamabad1-1024x400.jpg"
        alt="blog_img"
        class="aspect-video object-cover h-[500px]"
      >
      <div class="absolute top-2">
        <p class="text-white font-semibold backdrop-blur-lg bg-black/50 px-3 py-1">15 Places To Get the Best Burgers in Islamabad</p>
      </div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <a
          href="https://blogpakistan.pk/burgers-in-islamabad/"
          target="_blank"
          class="text-white font-semibold backdrop-blur-lg bg-black/50 px-3 py-1"
        >
          Read Here!
        </a>
      </div>
      <div class="absolute bottom-0">
        <p class="text-white font-semibold backdrop-blur-lg bg-black/50 px-3 py-1">
        Burgers are popular fast food items that keep one full for hours. They are juicy, tasty, and a combination,
        of delicious meat, sauces, and buns that are a match made in heaven. If you are a burger fan and want to try out the
        best burgers in Islamabad, here are 15 suggestions that won’t disappoint!
        </p>
      </div>
    </div>
  </div>
  `,
  styleUrl: './blog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent { }
