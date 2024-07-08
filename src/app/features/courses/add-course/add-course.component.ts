import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../../../services/courses/courses.service';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent {
  title: string = '';
  description: string = '';
  date: string = '';
  duration: number | string = '';

  constructor(private coursesService: CoursesService, private router: Router) {}

  handleSave() {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      title: this.title,
      description: this.description,
      creationDate: new Date(this.date),
      duration: +this.duration,
      topRated: false,
    };
    this.coursesService.createCourse(newCourse);
    this.router.navigate(['/']);
  }

  handleCancel() {
    this.router.navigate(['/']);
  }
}
