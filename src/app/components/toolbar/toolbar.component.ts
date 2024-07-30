import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router, private coursesService: CoursesService) {}

  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last event before emitting last event
        distinctUntilChanged() // Only emit if value is different from the last value
      )
      .subscribe({
        next: (query) => {
          this.search.emit(query);
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
    this.coursesService.loadCourses(0, 5, '');
  }

  handleAddCourse() {
    this.router.navigate(['/courses/new']);
  }
}
