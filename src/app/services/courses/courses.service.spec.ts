import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { Course, CoursesResponse } from '../../models/course';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  const mockCoursesResponse: CoursesResponse = {
    content: [
      {
        id: '1',
        name: 'Course 1',
        date: '2023-01-01',
        length: 120,
        authors: [],
      },
      {
        id: '2',
        name: 'Course 2',
        date: '2023-01-02',
        length: 90,
        authors: [],
      },
    ],
    page: 0,
    pageSize: 5,
    totalLength: 2,
  };

  const mockCourse: Course = {
    id: '1',
    name: 'Course 1',
    date: '2023-01-01',
    length: 120,
    authors: [],
    description: 'Course 1 description',
    isTopRated: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses', () => {
    service.getCourses().subscribe((response) => {
      expect(response).toEqual(mockCoursesResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?start=0&count=5`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCoursesResponse);
  });

  it('should fetch a course by id', () => {
    service.getCourseById('1').subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });

  it('should create a new course', () => {
    service.createCourse(mockCourse).subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCourse);
    req.flush(mockCourse);
  });

  it('should update a course', () => {
    service.updateCourse(mockCourse).subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mockCourse.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockCourse);
    req.flush(mockCourse);
  });

  it('should delete a course', () => {
    service.removeCourse('1').subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should fetch courses with textFragment', () => {
    const textFragment = 'Course';
    service.getCourses(0, 5, textFragment).subscribe((response) => {
      expect(response).toEqual(mockCoursesResponse);
    });

    const req = httpMock.expectOne(
      `${service['apiUrl']}?start=0&count=5&textFragment=${textFragment}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCoursesResponse);
  });
});
