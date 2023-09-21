import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageComponent } from './list-page.component';
import { PostService } from '../services/post.service';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListPageComponent],
      providers: [
        {
          provide: PostService,
          useValue: {
            groupBy: jasmine.createSpy(),
            groupedPosts: jasmine.createSpy().and.returnValue([
              {
                name: 'group1',
              },
            ]),
            toggleGroupExpanded: jasmine.createSpy(),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostService);
    fixture.detectChanges();
  });

  it('should toggle group expanded', () => {
    const groupButtonEl = fixture.nativeElement.querySelector('button');

    groupButtonEl.click();

    expect(service.toggleGroupExpanded).toHaveBeenCalledWith('group1');
  });
});
