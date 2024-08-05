import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../app.state';
import { authReducer } from '../auth/auth.reducer';
import { coursesReducer } from '../courses/courses.reducer';

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  courses: coursesReducer,
};
