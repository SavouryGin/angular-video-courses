import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Author } from '../../../models/course';
import { CoursesService } from '../../../services/courses/courses.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
})
export class AuthorsInputComponent implements OnInit {
  @Input() selectedAuthors: Author[] = [];
  @Output() selectedAuthorsChange = new EventEmitter<Author[]>();

  authors: Author[] = [];
  authorSearchControl = new FormControl('');

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.authorSearchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.handleAuthorSearch(query);
      });
  }

  handleAuthorSearch(query: string | null) {
    if (query?.length && query.length > 0) {
      this.coursesService.getAuthors().subscribe((authors) => {
        this.authors = authors.filter((author) =>
          author.name.toLowerCase().includes(query.toLowerCase())
        );
      });
    } else {
      this.authors = [];
    }
  }

  handleAuthorSelect(author: Author) {
    if (!this.selectedAuthors.find((a) => a.id === author.id)) {
      this.selectedAuthors.push(author);
      this.selectedAuthorsChange.emit(this.selectedAuthors);
    }
  }

  handleAuthorRemove(author: Author) {
    this.selectedAuthors = this.selectedAuthors.filter(
      (a) => a.id !== author.id
    );
    this.selectedAuthorsChange.emit(this.selectedAuthors);
  }
}
