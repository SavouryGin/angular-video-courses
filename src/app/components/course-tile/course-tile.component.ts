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

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}min`;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  handleEdit() {
    console.log(`Editing course: ${this.course.id}`);
  }

  handleDelete() {
    console.log(`Deleting course: ${this.course.id}`);
    this.deleteCourse.emit(this.course.id);
  }
}
