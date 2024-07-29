import { Injectable } from '@angular/core';
import { Course, CoursesResponse } from '../../models/course';
import { finalize, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly apiUrl = `${environment.apiUrl}/courses`;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  getCourses(
    start: number = 0,
    count: number = 5,
    textFragment?: string
  ): Observable<CoursesResponse> {
    this.loadingService.show();
    let params = new HttpParams()
      .set('start', start.toString())
      .set('count', count.toString());
    if (textFragment) {
      params = params.set('textFragment', textFragment);
    }
    return this.http
      .get<CoursesResponse>(this.apiUrl, { params })
      .pipe(finalize(() => this.loadingService.hide()));
  }

  getCourseById(id: string): Observable<Course> {
    this.loadingService.show();
    return this.http
      .get<Course>(`${this.apiUrl}/${id}`)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  createCourse(course: Course): Observable<Course> {
    this.loadingService.show();
    return this.http
      .post<Course>(this.apiUrl, course)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  updateCourse(updatedCourse: Course): Observable<Course> {
    this.loadingService.show();
    return this.http
      .patch<Course>(`${this.apiUrl}/${updatedCourse.id}`, updatedCourse)
      .pipe(finalize(() => this.loadingService.hide()));
  }

  removeCourse(id: string): Observable<void> {
    this.loadingService.show();
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
