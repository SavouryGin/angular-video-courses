import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from '../../../models/course';
import { AppState } from '../../../store/app.state';
import * as CoursesActions from '../../../store/courses/courses.actions';
import { selectCourses } from '../../../store/courses/courses.selectors';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  title: string = '';
  description: string = '';
  date: string = '';
  duration: number | string = '';
  isEditMode: boolean = false;
  courseId?: string;
  errorMessage: string | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.courseId) {
      this.isEditMode = true;
      this.store.select(selectCourses).subscribe((courses) => {
        const course = courses.find((c) => c.id == this.courseId);
        if (course) {
          this.title = course.name;
          this.description = course.description ?? '';
          this.date = new Date(course.date).toISOString().split('T')[0];
          this.duration = course.length;
        } else {
          this.errorMessage = 'Failed to load course details';
        }
      });
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

    this.store.dispatch(CoursesActions.updateCourse({ course: updatedCourse }));
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

    this.store.dispatch(CoursesActions.createCourse({ course: newCourse }));
  }

  handleSave() {
    if (this.isEditMode) {
      this.updateCourse();
    } else {
      this.addCourse();
    }
    this.router.navigate(['/courses']);
  }

  handleCancel() {
    this.router.navigate(['/']);
  }
}
