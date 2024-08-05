import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { Course } from '../../../models/course';
import {
  selectCourses,
  selectCoursesLoading,
  selectCoursesError,
} from '../../../store/courses/courses.selectors';
import { CoursesService } from '../../../services/courses/courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  currentPage: number = 0;
  pageSize: number = 5;
  searchQuery: string = '';

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private coursesService: CoursesService
  ) {
    this.courses$ = this.store.pipe(select(selectCourses));
    this.loading$ = this.store.pipe(select(selectCoursesLoading));
    this.error$ = this.store.pipe(select(selectCoursesError));
  }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(start: number = 0, count: number = 5, query: string = '') {
    this.coursesService.loadCourses(start, count, query);
  }

  onSearch(query: string) {
    this.currentPage = 0;
    this.searchQuery = query;
    this.loadCourses(0, this.pageSize, this.searchQuery);
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
    this.loadCourses(0, this.pageSize, this.searchQuery);
  }
}
