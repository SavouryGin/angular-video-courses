import { Injectable } from '@angular/core';
import { Author, Course, CoursesResponse } from '../../models/course';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as CoursesActions from '../../store/courses/courses.actions';
import { AppState } from '../../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly apiUrl = `${environment.apiUrl}/courses`;
  private readonly authorsUrl = `${environment.apiUrl}/authors`;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  loadCourses(
    start: number = 0,
    count: number = 5,
    textFragment?: string
  ): void {
    this.store.dispatch(
      CoursesActions.loadCourses({ start, count, query: textFragment || '' })
    );
  }

  fetchCourses(
    start: number = 0,
    count: number = 5,
    textFragment?: string
  ): Observable<CoursesResponse> {
    let params = new HttpParams()
      .set('start', start.toString())
      .set('count', count.toString());
    if (textFragment) {
      params = params.set('textFragment', textFragment);
    }
    return this.http.get<CoursesResponse>(this.apiUrl, { params });
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(updatedCourse: Course): Observable<Course> {
    return this.http.patch<Course>(
      `${this.apiUrl}/${updatedCourse.id}`,
      updatedCourse
    );
  }

  removeCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAuthors(textFragment?: string): Observable<Author[]> {
    let params = new HttpParams();
    if (textFragment) {
      params = params.set('textFragment', textFragment);
    }
    return this.http.get<Author[]>(this.authorsUrl, { params });
  }
}
