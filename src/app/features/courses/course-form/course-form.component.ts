import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  courseForm!: FormGroup;
  isEditMode: boolean = false;
  courseId?: string;
  errorMessage: string | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? undefined;

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });

    if (this.courseId) {
      this.isEditMode = true;
      this.store.select(selectCourses).subscribe((courses) => {
        const course = courses.find((c) => c.id == this.courseId);
        if (course) {
          this.courseForm.patchValue({
            title: course.name,
            description: course.description ?? '',
            date: new Date(course.date).toISOString().split('T')[0],
            duration: course.length,
          });
        } else {
          this.errorMessage = 'Failed to load course details';
        }
      });
    }
  }

  updateCourse() {
    const updatedCourse: Course = {
      id: this.courseId!,
      name: this.courseForm.value.title,
      description: this.courseForm.value.description,
      date: this.courseForm.value.date,
      length: +this.courseForm.value.duration,
      isTopRated: false,
      authors: [],
    };

    this.store.dispatch(CoursesActions.updateCourse({ course: updatedCourse }));
  }

  addCourse() {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      name: this.courseForm.value.title,
      description: this.courseForm.value.description,
      date: this.courseForm.value.date,
      length: +this.courseForm.value.duration,
      isTopRated: false,
      authors: [],
    };

    this.store.dispatch(CoursesActions.createCourse({ course: newCourse }));
  }

  handleSave() {
    if (this.courseForm.valid) {
      if (this.isEditMode) {
        this.updateCourse();
      } else {
        this.addCourse();
      }
      this.router.navigate(['/courses']);
    }
  }

  handleCancel() {
    this.router.navigate(['/']);
  }
}
