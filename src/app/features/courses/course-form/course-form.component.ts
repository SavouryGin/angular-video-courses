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
        this.title = course.name;
        this.description = course.description ?? '';
        this.date = new Date(course.date).toISOString().split('T')[0];
        this.duration = course.length;
      }
    }
  }

  updateCourse() {
    const updatedCourse: Course = {
      id: this.courseId!,
      name: this.title,
      description: this.description,
      date: this.date,
      length: +this.duration,
      isTopRated: false,
      authors: [],
    };
    this.coursesService.updateCourse(updatedCourse);
  }

  addCourse() {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      name: this.title,
      description: this.description,
      date: this.date,
      length: +this.duration,
      isTopRated: false,
      authors: [],
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
