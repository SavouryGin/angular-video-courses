import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseTileComponent {
  @Input() course!: Course;
  @Output() deleteCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();

  handleEdit() {
    this.editCourse.emit(this.course.id);
  }

  handleDelete() {
    this.deleteCourse.emit(this.course.id);
  }
}
