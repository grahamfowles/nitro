import { CanActivateFn, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { inject } from '@angular/core';

export const postExistsGuard: CanActivateFn = (route) => {
  const postService = inject(PostService);
  const router = inject(Router);

  try {
    postService.getPostById(route.params['id']);
    return true;
  } catch (e) {
    router.navigateByUrl('');
    return false;
  }
};
