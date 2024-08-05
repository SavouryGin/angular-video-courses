import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AppState, AuthState>(
  'auth'
);

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
