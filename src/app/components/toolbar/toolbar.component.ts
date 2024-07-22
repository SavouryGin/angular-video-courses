import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import { CoursesService } from '../../services/courses/courses.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  @Output() search = new EventEmitter<Course[]>();

  constructor(private router: Router, private coursesService: CoursesService) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last event before emitting last event
        filter((query) => query.length >= 3), // Only emit if query length is 3 or more characters
        distinctUntilChanged(), // Only emit if value is different from the last value
        switchMap((query) => this.coursesService.getCourses(0, 5, query))
      )
      .subscribe({
        next: (response) => {
          this.search.emit(response.content);
        },
        error: (error) => {
          console.error('Search error:', error);
        },
      });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchInputChange(query: string) {
    this.searchSubject.next(query);
  }

  handleClearSearch() {
    this.searchQuery = '';
    this.searchSubject.next('');
    this.coursesService.getCourses(0, 5, '').subscribe({
      next: (response) => {
        this.search.emit(response.content);
      },
      error: (error) => {
        console.error('Clear search error:', error);
      },
    });
  }

  handleAddCourse() {
    this.router.navigate(['/courses/new']);
  }
}
