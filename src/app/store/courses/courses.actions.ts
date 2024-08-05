import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course';

export const loadCourses = createAction(
  '[Courses] Load Courses',
  props<{ start: number; count: number; query: string }>()
);

export const loadCoursesSuccess = createAction(
  '[Courses] Load Courses Success',
  props<{ courses: Course[]; totalLength: number }>()
);

export const loadCoursesFailure = createAction(
  '[Courses] Load Courses Failure',
  props<{ error: any }>()
);

export const createCourse = createAction(
  '[Courses] Create Course',
  props<{ course: Course }>()
);

export const createCourseSuccess = createAction(
  '[Courses] Create Course Success',
  props<{ course: Course }>()
);

export const createCourseFailure = createAction(
  '[Courses] Create Course Failure',
  props<{ error: string }>()
);

export const updateCourse = createAction(
  '[Courses] Update Course',
  props<{ course: Course }>()
);

export const updateCourseSuccess = createAction(
  '[Courses] Update Course Success',
  props<{ course: Course }>()
);

export const updateCourseFailure = createAction(
  '[Courses] Update Course Failure',
  props<{ error: string }>()
);
