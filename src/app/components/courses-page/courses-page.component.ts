import { Component, OnInit } from '@angular/core';
import { COURSES_LIST } from '../../../__mocks__/course-list';
import { Course } from '../../models/course';
import { FilterPipe } from '../../pipes/filter';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(private filterPipe: FilterPipe) {
    console.log('CoursesPageComponent constructor');
  }

  ngOnChanges() {
    console.log('CoursesPageComponent ngOnChanges');
  }

  ngOnInit() {
    this.courses = COURSES_LIST;
    this.filteredCourses = this.courses;
  }

  onSearch(query: string) {
    this.filteredCourses = this.filterPipe.transform(this.courses, query);
  }

  onCourseDelete(courseId: string) {
    console.log(`Course deleted: ${courseId}`);
    this.courses = this.courses.filter((course) => course.id !== courseId);
    this.filteredCourses = this.filteredCourses.filter(
      (course) => course.id !== courseId
    );
  }

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  handleLoadMore() {
    console.log('Load More button clicked');
  }
}
