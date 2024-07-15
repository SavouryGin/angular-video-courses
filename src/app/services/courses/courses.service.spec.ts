import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { COURSES_LIST } from '../../../__mocks__/course-list';
import { Course } from '../../models/course';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of courses', () => {
    expect(service.getCourses()).toEqual(COURSES_LIST);
  });

  it('should return a course by ID', () => {
    const course: Course = COURSES_LIST[0];
    expect(service.getCourseById(course.id)).toEqual(course);
  });

  it('should create a new course', () => {
    const newCourse: Course = {
      id: '4',
      name: 'New Course',
      date: '2024-05-01',
      length: 120,
      description: 'This is a new course',
      isTopRated: false,
      authors: [],
    };
    service.createCourse(newCourse);
    expect(service.getCourses()).toContain(newCourse);
  });

  it('should update an existing course', () => {
    const updatedCourse: Course = {
      ...COURSES_LIST[0],
      name: 'Updated Course',
    };
    service.updateCourse(updatedCourse);
    expect(service.getCourseById(updatedCourse.id)?.name).toBe(
      'Updated Course'
    );
  });

  it('should remove a course by ID', () => {
    const courseId = COURSES_LIST[0].id;
    service.removeCourse(courseId);
    expect(service.getCourses().length).toBe(COURSES_LIST.length - 1);
    expect(service.getCourseById(courseId)).toBeUndefined();
  });
});
