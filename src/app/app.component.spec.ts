import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { PostService } from './services/post.service';
import { GroupingType } from './models/grouping-type.model';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        {
          provide: PostService,
          useValue: {
            loadPosts: jasmine.createSpy(),
            groupBy: {
              set: jasmine.createSpy(),
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.inject(PostService);
  });

  it('should set group by', () => {
    app.setGroupBy(GroupingType.Author);

    expect(service.groupBy.set).toHaveBeenCalledWith(GroupingType.Author);
  });
});
