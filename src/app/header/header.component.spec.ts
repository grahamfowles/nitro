import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { PostService } from '../services/post.service';
import { GroupingType } from '../models/grouping-type.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        {
          provide: PostService,
          useValue: {
            groupBy: {
              set: jasmine.createSpy(),
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostService);

    fixture.detectChanges();
  });

  it('should set groupBy on the service when the select is changed', () => {
    component.groupBy?.setValue(GroupingType.Author);

    expect(service.groupBy.set).toHaveBeenCalledWith(GroupingType.Author);
  });

  it('should toggle dark mode', () => {
    const body = globalThis.document.querySelector('body');

    component.toggleDarkMode();

    expect(body?.className).toEqual('darkmode');

    component.toggleDarkMode();

    expect(body?.className).toEqual('');
  });
});
