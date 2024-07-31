import { Action, createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, setUser } from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

const _authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
  })),
  on(setUser, (state, { user }) => ({
    ...state,
    user,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
