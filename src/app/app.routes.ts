import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  { path: '**', redirectTo: 'not-found' },
];
