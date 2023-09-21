import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { postExistsGuard } from './post-exists.guard';
import { PostService } from '../services/post.service';

describe('postExistsGuard', () => {
  let postService: PostService;
  let router: Router;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => postExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: PostService,
          useValue: {
            getPostById: jasmine.createSpy(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: jasmine.createSpy(),
          },
        },
      ],
    });

    postService = TestBed.inject(PostService);
    router = TestBed.inject(Router);
  });

  it('should redirect to list if the post does not exist', () => {
    (postService.getPostById as jasmine.Spy).and.throwError('error');

    const result = executeGuard(
      { params: { id: '1' } } as unknown as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(router.navigateByUrl).toHaveBeenCalledWith('');
    expect(result).toBeFalse();
  });

  it('should return true if post exists', () => {
    (postService.getPostById as jasmine.Spy).and.returnValue({});

    const result = executeGuard(
      { params: { id: '1' } } as unknown as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(router.navigateByUrl).not.toHaveBeenCalledWith('');
    expect(result).toBeTrue();
  });
});
