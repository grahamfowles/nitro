import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { add, getUnixTime, sub } from 'date-fns';
import { GroupingType } from '../models/grouping-type.model';

const posts: Post[] = [
  {
    id: 1,
    location: 'Paris',
    author: 'John Doe',
    time: getUnixTime(new Date()).toString(),
    text: 'Post 1',
  },
  {
    id: 2,
    location: 'Madrid',
    author: 'Fred Blogs',
    time: getUnixTime(sub(new Date(), { weeks: 1 })).toString(),
    text: 'Post 2',
  },
  {
    id: 3,
    location: 'Madrid',
    author: 'John Doe',
    time: getUnixTime(sub(new Date(), { weeks: 2 })).toString(),
    text: 'Post 3',
  },
] as Post[];

describe('PostService', () => {
  let service: PostService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj<HttpClient>('HttpClient', ['get']),
        },
      ],
    });

    service = TestBed.inject(PostService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClient.get.and.returnValue(of(posts));
  });

  it('should load posts', () => {
    environment.apiUrl = 'http://test.url';
    service.loadPosts();

    expect(httpClient.get).toHaveBeenCalledWith('http://test.url/data.json');
  });

  it('should toggle group expanded', () => {
    service.expandedGroups.set(['1']);

    service.toggleGroupExpanded('2');

    expect(service.expandedGroups()).toEqual(['1', '2']);

    service.toggleGroupExpanded('2');

    expect(service.expandedGroups()).toEqual(['1']);
  });

  it('should get post by id', () => {
    service.loadPosts();

    expect(service.getPostById('1')).toBe(posts[0]);
  });

  it('should throw and error if the post does not exist', () => {
    service.loadPosts();

    expect(() => service.getPostById('0')).toThrowError(
      "Post with id '0' does not exist."
    );
  });

  it('should update a post', () => {
    const updatedPost: Post = {
      id: 1,
      location: 'London',
    } as Post;
    service.loadPosts();

    service.updatePost(updatedPost);

    expect(service.getPostById('1')).toEqual(updatedPost);
  });

  it('should group posts by author', () => {
    service.loadPosts();
    service.groupBy.set(GroupingType.Author);

    expect(service.groupedPosts()).toEqual([
      {
        name: 'Fred Blogs',
        expanded: false,
        posts: [posts[1]],
      },
      {
        name: 'John Doe',
        expanded: false,
        posts: [posts[0], posts[2]],
      },
    ]);
  });

  it('should group posts by location', () => {
    service.loadPosts();
    service.groupBy.set(GroupingType.Location);

    expect(service.groupedPosts()).toEqual([
      {
        name: 'Madrid',
        expanded: false,
        posts: [posts[1], posts[2]],
      },
      {
        name: 'Paris',
        expanded: false,
        posts: [posts[0]],
      },
    ]);
  });

  it('should group posts by week', () => {
    service.loadPosts();
    service.groupBy.set(GroupingType.Time);

    expect(service.groupedPosts()).toEqual([
      {
        name: 'This Week',
        expanded: false,
        posts: [posts[0]],
      },
      {
        name: 'Last Week',
        expanded: false,
        posts: [posts[1]],
      },
      {
        name: '2 weeks ago',
        expanded: false,
        posts: [posts[2]],
      },
    ]);
  });

  it('should throw an error for posts with a future date', () => {
    httpClient.get.and.returnValue(
      of([
        {
          id: 1,
          location: 'Paris',
          author: 'John Doe',
          time: getUnixTime(add(new Date(), { days: 1 })).toString(),
          text: 'Post 1',
        },
      ])
    );
    service.loadPosts();
    service.groupBy.set(GroupingType.Time);

    expect(() => service.groupedPosts()).toThrowError('Invalid future date');
  });
});
