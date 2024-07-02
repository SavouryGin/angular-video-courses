import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses/courses.service';
import { FilterPipe } from '../../pipes/filter';

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

  onCourseEdit(courseId: string) {
    console.log(`Editing course: ${courseId}`);
    // Logic to handle editing can be added here
  }

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  handleLoadMore() {
    console.log('Load More button clicked');
  }
}
