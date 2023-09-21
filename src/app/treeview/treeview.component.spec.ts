import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeviewComponent } from './treeview.component';
import { GroupedPosts } from '../models/grouped-posts.model';
import { Post } from '../models/post.model';

describe('TreeviewComponent', () => {
  const groupedPosts = [
    {
      name: 'group1',
      expanded: false,
      posts: [
        {
          id: 1,
          text: 'post1',
        },
        {
          id: 2,
          text: 'post2',
        },
      ],
    },
  ] as GroupedPosts[];

  let component: TreeviewComponent;
  let fixture: ComponentFixture<TreeviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeviewComponent],
    });

    fixture = TestBed.createComponent(TreeviewComponent);
    component = fixture.componentInstance;
    component.groupedPosts = groupedPosts;
    fixture.detectChanges();
  });

  it('should toggle group expanded', () => {
    spyOn(component.groupToggled, 'emit');

    const groupButtonEl = fixture.nativeElement.querySelector('button');

    groupButtonEl.click();

    expect(component.groupToggled.emit).toHaveBeenCalledWith('group1');
  });

  it('should track by unique values', () => {
    expect(
      component.trackByGroupName(0, { name: 'groupName' } as GroupedPosts)
    ).toEqual('groupName');

    expect(component.trackByPostId(0, { id: 1 } as Post)).toEqual(1);
  });
});
