import { Routes } from '@angular/router';

import { PostPageComponent } from './post-page.component';
import { postExistsGuard } from './post-exists.guard';

export const postPageRoutes: Routes = [
  {
    path: '',
    component: PostPageComponent,
    canActivate: [postExistsGuard],
  },
];
