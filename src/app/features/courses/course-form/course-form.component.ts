import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../services/courses/courses.service';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseForm implements OnInit {
  title: string = '';
  description: string = '';
  date: string = '';
  duration: number | string = '';
  isEditMode: boolean = false;
  courseId?: string;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.courseId) {
      this.isEditMode = true;
      const course = this.coursesService.getCourseById(this.courseId);
      if (course) {
        this.title = course.title;
        this.description = course.description ?? '';
        this.date = new Date(course.creationDate).toISOString().split('T')[0];
        this.duration = course.duration;
      }
    }
  }

  updateCourse() {
    const updatedCourse: Course = {
      id: this.courseId!,
      title: this.title,
      description: this.description,
      creationDate: new Date(this.date),
      duration: +this.duration,
      topRated: false,
    };
    this.coursesService.updateCourse(updatedCourse);
  }

  addCourse() {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      title: this.title,
      description: this.description,
      creationDate: new Date(this.date),
      duration: +this.duration,
      topRated: false,
    };
    this.coursesService.createCourse(newCourse);
  }

  handleSave() {
    if (this.isEditMode) {
      this.updateCourse();
    } else {
      this.addCourse();
    }
    this.router.navigate(['/']);
  }

  handleCancel() {
    this.router.navigate(['/']);
  }
}
