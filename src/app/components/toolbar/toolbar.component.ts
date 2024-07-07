import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  searchQuery: string = '';

  @Output() search = new EventEmitter<string>();

  constructor(private router: Router) {}

  handleSearch() {
    this.search.emit(this.searchQuery);
  }

  handleAddCourse() {
    this.router.navigate(['/courses/add']);
  }
}
