import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./list-page/list-page.routes').then(
        (routes) => routes.listPageRoutes
      ),
  },
  {
    path: 'post/:id',
    loadChildren: () =>
      import('./post-page/post-page.routes').then(
        (routes) => routes.postPageRoutes
      ),
  },
];
