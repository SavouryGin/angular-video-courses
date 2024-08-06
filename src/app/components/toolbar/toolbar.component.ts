import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private searchSubscription!: Subscription;

  @Output() search = new EventEmitter<string>();

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchQuery: [''],
    });
  }

  ngOnInit() {
    this.searchSubscription = this.searchForm
      .get('searchQuery')!
      .valueChanges.pipe(
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

  handleClearSearch() {
    this.searchForm.get('searchQuery')!.setValue('');
    this.coursesService.loadCourses(0, 5, '');
  }

  handleAddCourse() {
    this.router.navigate(['/courses/new']);
  }
}
