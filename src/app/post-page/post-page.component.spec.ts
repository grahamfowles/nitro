import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageComponent } from './post-page.component';
import { PostService } from '../services/post.service';
import { provideRouter } from '@angular/router';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostPageComponent],
      providers: [
        {
          provide: PostService,
          useValue: {
            getPostById: jasmine.createSpy().and.returnValue({
              location: 'Location',
              text: 'Text',
              author: 'Author',
              id: 0,
              time: '123123123',
            }),
            updatePost: jasmine.createSpy(),
            expandedGroups: {
              set: jasmine.createSpy(),
            },
          },
        },
        provideRouter([]),
      ],
    });
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostService);

    fixture.detectChanges();
  });

  it('should save posts and redirect if the form was changed', () => {
    component.formGroup.controls.location.setValue('Location2');
    component.formGroup.markAsDirty();
    fixture.detectChanges();

    component.savePost();

    expect(service.updatePost).toHaveBeenCalledWith({
      location: 'Location2',
      text: 'Text',
      author: 'Author',
      id: 0,
      time: '123123123',
    });
  });
});
