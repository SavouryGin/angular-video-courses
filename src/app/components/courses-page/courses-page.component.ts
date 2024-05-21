import { Component, OnInit } from '@angular/core';
import { COURSES_LIST } from '../../../__mocks__/course-list';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];

  constructor() {
    console.log('CoursesPageComponent constructor');
  }

  ngOnChanges() {
    console.log('CoursesPageComponent ngOnChanges');
  }

  ngOnInit() {
    console.log('CoursesPageComponent ngOnInit');
    this.courses = COURSES_LIST;
  }

  onCourseDelete(courseId: string) {
    console.log(`Course deleted: ${courseId}`);
    this.courses = this.courses.filter((course) => course.id !== courseId);
  }

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }
}
