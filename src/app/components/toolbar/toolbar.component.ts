import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  searchQuery: string = '';

  handleSearch() {
    console.log('Search button clicked', this.searchQuery);
    // Placeholder for search logic
  }

  handleAddCourse() {
    console.log('Add Course button clicked');
    // Placeholder for add course logic
  }
}
