import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { LoadingService } from '../loading/loading.service';
import { Course, CoursesResponse } from '../../models/course';
import { environment } from '../../../environments/environment';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/app.state';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;
  let loadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(() => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', [
      'show',
      'hide',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
        { provide: LoadingService, useValue: loadingServiceSpy },
        provideMockStore({ initialState }),
      ],
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(
      LoadingService
    ) as jasmine.SpyObj<LoadingService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses and call loadingService.show and hide', () => {
    const mockResponse: CoursesResponse = {
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
      ],
      page: 0,
      pageSize: 5,
      totalLength: 1,
    };

    service.fetchCourses(0, 5, 'Course').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/courses?start=0&count=5&textFragment=Course`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
  });

  it('should get a course by id and call loadingService.show and hide', () => {
    const mockCourse: Course = {
      id: '1',
      name: 'Course 1',
      date: '2024-01-01',
      length: 60,
      description: 'Description 1',
      isTopRated: false,
      authors: [],
    };

    service.getCourseById('1').subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);

    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
  });

  it('should create a course and call loadingService.show and hide', () => {
    const newCourse: Course = {
      id: '2',
      name: 'Course 2',
      date: '2024-02-01',
      length: 90,
      description: 'Description 2',
      isTopRated: true,
      authors: [],
    };
    const mockCourse: Course = {
      id: '2',
      name: 'Course 2',
      date: '2024-02-01',
      length: 90,
      description: 'Description 2',
      isTopRated: true,
      authors: [],
    };

    service.createCourse(newCourse).subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(mockCourse);

    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
  });

  it('should update a course and call loadingService.show and hide', () => {
    const updatedCourse: Course = {
      id: '1',
      name: 'Updated Course',
      date: '2024-01-01',
      length: 60,
      description: 'Updated Description',
      isTopRated: false,
      authors: [],
    };

    service.updateCourse(updatedCourse).subscribe((course) => {
      expect(course).toEqual(updatedCourse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/courses/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);

    expect(loadingService.show).toHaveBeenCalled();
    expect(loadingService.hide).toHaveBeenCalled();
  });
});
