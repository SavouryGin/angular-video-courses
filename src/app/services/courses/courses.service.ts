import { Injectable } from '@angular/core';
import { COURSES_LIST } from '../../../__mocks__/course-list';
import { Course } from '../../models/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = COURSES_LIST;

  constructor() {}

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find((course) => course.id === id);
  }

  createCourse(course: Course): void {
    this.courses.push(course);
  }

  updateCourse(updatedCourse: Course): void {
    const index = this.courses.findIndex(
      (course) => course.id === updatedCourse.id
    );
    if (index !== -1) {
      this.courses[index] = updatedCourse;
    }
  }

  removeCourse(id: string): void {
    this.courses = this.courses.filter((course) => course.id !== id);
  }
}
