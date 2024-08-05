import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';

export const selectCoursesState =
  createFeatureSelector<CoursesState>('courses');

export const selectCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.courses
);

export const selectCoursesLoading = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.loading
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.error
);
