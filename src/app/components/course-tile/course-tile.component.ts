import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss'],
})
export class CourseTileComponent {
  @Input() course!: Course;
  @Output() deleteCourse = new EventEmitter<string>();

  handleEdit() {
    console.log(`Editing course: ${this.course.id}`);
  }

  handleDelete() {
    this.deleteCourse.emit(this.course.id);
  }
}
