import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { FilterPipe } from '../../pipes/filter';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(
    private coursesService: CoursesService,
    private filterPipe: FilterPipe
  ) {}

  ngOnChanges() {
    console.log('CoursesPageComponent ngOnChanges');
  }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
    this.filteredCourses = this.courses;
  }

  onSearch(query: string) {
    this.filteredCourses = this.filterPipe.transform(this.courses, query);
  }

  onCourseDelete(courseId: string) {
    const confirmed = confirm(
      'Do you really want to delete this course? Yes/No'
    );
    if (confirmed) {
      this.coursesService.removeCourse(courseId);
      this.courses = this.coursesService.getCourses();
      this.filteredCourses = this.filterPipe.transform(this.courses, '');
    }
  }

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  handleLoadMore() {
    console.log('Load More button clicked');
  }
}
