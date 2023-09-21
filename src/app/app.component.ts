import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PostService } from './services/post.service';
import { HeaderComponent } from './header/header.component';
import { GroupingType } from './models/grouping-type.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'nitro';

  constructor(private postService: PostService) {
    this.postService.loadPosts();
  }

  setGroupBy(groupBy: GroupingType) {
    this.postService.groupBy.set(groupBy);
  }
}
