import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  searchQuery: string = '';

  @Output() search = new EventEmitter<string>();

  handleSearch() {
    console.log('Search button clicked', this.searchQuery);
    this.search.emit(this.searchQuery);
  }

  handleAddCourse() {
    console.log('Add Course button clicked');
    // Placeholder for add course logic
  }
}
