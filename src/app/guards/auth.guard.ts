import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { isAuthenticated } from '../store/auth/auth.selectors';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.pipe(
    select(isAuthenticated),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
