import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { GroupedPosts } from '../models/grouped-posts.model';
import { GroupingType } from '../models/grouping-type.model';
import { RouterLink } from '@angular/router';

import { Post } from '../models/post.model';

@Component({
  selector: 'app-treeview',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.scss'],
  standalone: true,
  imports: [CommonModule, JsonPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeviewComponent implements OnInit {
  @Input() groupedPosts: GroupedPosts[] = [];
  @Input() groupedBy: GroupingType = GroupingType.Time;
  @Input() label = '';

  @Output() groupToggled: EventEmitter<string> = new EventEmitter<string>();

  focusedElement = '';

  ngOnInit() {
    this.focusedElement = this.groupedPosts[0]?.name;
  }

  toggleGroup(groupName: string): void {
    this.groupToggled.emit(groupName);
  }

  trackByGroupName(_: number, group: GroupedPosts): string {
    return group.name;
  }

  trackByPostId(_: number, post: Post): number {
    return post.id;
  }
}
