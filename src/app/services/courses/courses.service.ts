import { Injectable } from '@angular/core';
import { Course, CoursesResponse } from '../../models/course';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly apiUrl = 'http://localhost:3004/courses';

  constructor(private http: HttpClient) {}

  getCourses(
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
}
