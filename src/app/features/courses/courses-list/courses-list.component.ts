import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../../services/courses/courses.service';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  errorMessage: string | null = null;
  currentPage: number = 0;
  pageSize: number = 5;
  totalCourses: number = 0;
  searchQuery: string = '';

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(start: number = 0, count: number = 5, query: string = '') {
    this.coursesService.getCourses(start, count, query).subscribe({
      next: (response) => {
        this.totalCourses = response.totalLength;
        this.courses = [...this.courses, ...response.content];
        this.currentPage++;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load courses';
        console.error('Error loading courses', error);
      },
    });
  }

  onSearch(results: Course[]) {
    this.courses = results;
    this.currentPage = 0;
    this.totalCourses = results.length;
  }

  onCourseDelete(courseId: string) {
    const confirmed = confirm(
      'Do you really want to delete this course? Yes/No'
    );
    if (confirmed) {
      this.coursesService.removeCourse(courseId).subscribe({
        next: () => {
          this.resetCourses();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete course';
          console.error('Error deleting course', error);
        },
      });
    }
  }

  onCourseEdit(courseId: string) {
    this.router.navigate([`/courses/${courseId}`]);
  }

  trackByCourseId(index: number, course: Course): string {
    return course.id;
  }

  handleLoadMore() {
    const nextStart = this.currentPage + 1;
    this.loadCourses(nextStart, this.pageSize, this.searchQuery);
  }

  private resetCourses() {
    this.currentPage = 0;
    this.courses = [];
    this.loadCourses(0, this.pageSize, this.searchQuery);
  }
}
