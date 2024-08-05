import { AuthState, initialAuthState } from './auth/auth.state';
import { CoursesState, initialCoursesState } from './courses/courses.state';

export interface AppState {
  auth: AuthState;
  courses: CoursesState;
}

export const initialState: AppState = {
  auth: initialAuthState,
  courses: initialCoursesState,
};
