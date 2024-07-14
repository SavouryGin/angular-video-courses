import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../services/courses/courses.service';
import { FilterPipe } from '../../../pipes/filter';
import { Course } from '../../../models/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  constructor(
    private coursesService: CoursesService,
    private filterPipe: FilterPipe,
    private router: Router
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
    this.router.navigate([`/courses/${courseId}`]);
  }

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  handleLoadMore() {
    console.log('Load More button clicked');
  }
}
