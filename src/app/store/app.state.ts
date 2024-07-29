import { AuthState, initialAuthState } from './auth/auth.state';

export interface AppState {
  auth: AuthState;
}

export const initialState: AppState = {
  auth: initialAuthState,
};
