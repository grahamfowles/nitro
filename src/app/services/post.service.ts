import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { GroupingType } from '../models/grouping-type.model';
import { GroupedPosts } from '../models/grouped-posts.model';
import { differenceInCalendarWeeks, fromUnixTime, getUnixTime } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  groupedPosts: Signal<GroupedPosts[]> = computed(() => {
    return this.groupByKey(this.groupBy());
  });
  groupBy: WritableSignal<GroupingType> = signal(GroupingType.Time);
  expandedGroups: WritableSignal<string[]> = signal([]);

  private posts: WritableSignal<Post[]> = signal([]);

  constructor(private httpClient: HttpClient) {}

  loadPosts(): void {
    this.httpClient
      .get<Post[]>(`${environment.apiUrl}/data.json`)
      .subscribe((posts) => {
        this.posts.set(posts);
      });
  }

  toggleGroupExpanded(groupName: string) {
    this.expandedGroups.set(
      this.expandedGroups().includes(groupName)
        ? this.expandedGroups().filter((name: string) => name !== groupName)
        : [...this.expandedGroups(), groupName]
    );
  }

  getPostById(id: string): Post {
    const post = this.posts().find((post: Post) => post.id.toString() === id);

    if (!post) {
      throw new Error(`Post with id '${id}' does not exist.`);
    }

    return post;
  }

  updatePost(updatedPost: Post) {
    this.posts.set(
      this.posts().map((post: Post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  }

  private groupByKey(key: GroupingType): GroupedPosts[] {
    return this.posts().reduce((groupedPosts: GroupedPosts[], post: Post) => {
      const existingGroup = groupedPosts.find(
        (group: GroupedPosts) => group.name === this.getGroupName(key, post)
      );

      if (existingGroup) {
        existingGroup.posts = [...existingGroup.posts, post];
      } else {
        groupedPosts.push({
          name: this.getGroupName(key, post),
          expanded: this.expandedGroups().includes(
            this.getGroupName(key, post)
          ),
          posts: [post],
        });
      }

      return groupedPosts.sort((group1: GroupedPosts, group2: GroupedPosts) => {
        const name1 = group1.name
          .replace('This Week', '0')
          .replace('Last Week', '1');
        const name2 = group2.name
          .replace('This Week', '0')
          .replace('Last Week', '1');

        return name1 < name2 ? -1 : 1;
      });
    }, []);
  }

  private getGroupName(key: GroupingType, post: Post): string {
    if (key === GroupingType.Time) {
      const postTime: number = +post.time;

      if (postTime > getUnixTime(new Date())) {
        throw new Error('Invalid future date');
      }

      const weeksAgo = differenceInCalendarWeeks(
        new Date(),
        fromUnixTime(+post.time)
      );

      switch (weeksAgo) {
        case 0:
          return 'This Week';
        case 1:
          return 'Last Week';
        default:
          return `${weeksAgo} weeks ago`;
      }
    }

    return post[key];
  }
}
