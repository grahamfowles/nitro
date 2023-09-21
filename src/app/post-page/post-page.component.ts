import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
  ],
})
export class PostPageComponent {
  post: Post = this.postService.getPostById(
    this.activatedRoute.snapshot.params['id']
  );
  formGroup = this.formBuilder.group({
    location: [this.post.location],
    text: [this.post.text],
  });

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  savePost() {
    if (this.formGroup.dirty) {
      const { id, author, time } = this.post;
      const { location, text } = this.formGroup.value;

      this.postService.updatePost({
        id,
        author,
        time,
        location: location || '',
        text: text || '',
      });

      this.postService.expandedGroups.set([]);
    }

    this.router.navigateByUrl('');
  }
}
