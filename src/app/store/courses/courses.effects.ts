import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../services/courses/courses.service';
import * as CoursesActions from './courses.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      mergeMap((action) =>
        this.coursesService
          .fetchCourses(action.start, action.count, action.query)
          .pipe(
            map((response) =>
              CoursesActions.loadCoursesSuccess({
                courses: response.content,
                totalLength: response.totalLength,
              })
            ),
            catchError((error) =>
              of(CoursesActions.loadCoursesFailure({ error }))
            )
          )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.createCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course) => CoursesActions.createCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.createCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.updateCourse),
      mergeMap((action) =>
        this.coursesService.updateCourse(action.course).pipe(
          map((course) => CoursesActions.updateCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.updateCourseFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
