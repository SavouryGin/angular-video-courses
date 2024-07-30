import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { initialCoursesState } from './courses.state';

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CoursesActions.loadCourses, (state) => ({ ...state, loading: true })),
  on(CoursesActions.loadCoursesSuccess, (state, { courses, totalLength }) => ({
    ...state,
    courses,
    totalLength,
    loading: false,
    error: null,
  })),
  on(CoursesActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CoursesActions.createCourse, (state) => ({
    ...state,
    loading: true,
  })),
  on(CoursesActions.createCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
    loading: false,
  })),
  on(CoursesActions.createCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CoursesActions.updateCourse, (state) => ({
    ...state,
    loading: true,
  })),
  on(CoursesActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((c) => (c.id === course.id ? course : c)),
    loading: false,
  })),
  on(CoursesActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
