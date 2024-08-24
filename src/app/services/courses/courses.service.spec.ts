import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { Store, StoreModule } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Course, CoursesResponse } from '../../models/course';
import * as CoursesActions from '../../store/courses/courses.actions';
import { AppState } from '../../store/app.state';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;
  let store: Store<AppState>;

  const mockCoursesResponse: CoursesResponse = {
    content: [
      {
        id: '1',
        name: 'Course 1',
        date: '2024-01-01',
        length: 60,
        description: 'Description 1',
        isTopRated: false,
        authors: [],
      },
      {
        id: '1',
        name: 'Course 2',
        date: '2024-01-01',
        length: 120,
        description: 'Description 2',
        isTopRated: false,
        authors: [],
      },
    ],
    page: 0,
    pageSize: 1,
    totalLength: 2,
  };

  const mockCourse: Course = {
    id: '1',
    name: 'Course 1',
    date: '2024-01-01',
    length: 60,
    description: 'Description 1',
    isTopRated: false,
    authors: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [StoreModule.forRoot({})],
    providers: [CoursesService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch loadCourses action', () => {
    service.loadCourses(0, 5, 'test');

    expect(store.dispatch).toHaveBeenCalledWith(
      CoursesActions.loadCourses({ start: 0, count: 5, query: 'test' })
    );
  });

  it('should fetch courses', () => {
    service.fetchCourses(0, 5, 'test').subscribe((response) => {
      expect(response).toEqual(mockCoursesResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/courses?start=0&count=5&textFragment=test`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCoursesResponse);
  });

  it('should get course by id', () => {
    service.getCourseById('1').subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('should create a new course', () => {
    service.createCourse(mockCourse).subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCourse);
  });

  it('should update a course', () => {
    service.updateCourse(mockCourse).subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockCourse);
  });

  it('should remove a course', () => {
    service.removeCourse('1').subscribe(() => {
      expect(true).toBeTrue(); // If it reaches here, it means the delete call was successful.
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
