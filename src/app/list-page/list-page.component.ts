import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/post.service';
import { TreeviewComponent } from '../treeview/treeview.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [CommonModule, TreeviewComponent, HeaderComponent],
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent {
  groupedBy = this.postService.groupBy;
  groupedPosts = this.postService.groupedPosts;
  header = `Posts grouped by ${this.groupedBy()}`;

  constructor(private postService: PostService) {}

  onGroupToggled(groupName: string) {
    this.postService.toggleGroupExpanded(groupName);
  }
}
