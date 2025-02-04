import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course, Author } from '../../../models/course';
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
  selectedAuthors: Author[] = [];

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
      date: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
          ),
        ],
      ],
      duration: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      authors: [[], Validators.required],
    });

    if (this.courseId) {
      this.isEditMode = true;
      this.store.select(selectCourses).subscribe((courses) => {
        const course = courses.find((c) => c.id == this.courseId);

        if (course) {
          this.courseForm.patchValue({
            title: course.name,
            description: course.description ?? '',
            date: this.formatServerDate(course.date),
            duration: course.length,
            authors: course.authors,
          });
          this.selectedAuthors = course.authors;
        } else {
          this.errorMessage = 'Failed to load course details';
        }
      });
    }
  }

  formatServerDate(courseDate: string) {
    const dateObject = new Date(courseDate);
    const date = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${date}/${month}/${year}`;
  }

  formatInputDate(dateString: string) {
    const [date, month, year] = dateString.split('/');
    return `${year}-${month}-${date}T00:00:00Z`;
  }

  updateCourse() {
    const updatedCourse: Course = {
      id: this.courseId!,
      name: this.courseForm.value.title,
      description: this.courseForm.value.description,
      date: this.formatInputDate(this.courseForm.value.date),
      length: +this.courseForm.value.duration,
      isTopRated: false,
      authors: this.courseForm.value.authors,
    };

    this.store.dispatch(CoursesActions.updateCourse({ course: updatedCourse }));
  }

  addCourse() {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      name: this.courseForm.value.title,
      description: this.courseForm.value.description,
      date: this.formatInputDate(this.courseForm.value.date),
      length: +this.courseForm.value.duration,
      isTopRated: false,
      authors: this.courseForm.value.authors,
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

  handleSelectedAuthorsChange(authors: Author[]) {
    this.courseForm.get('authors')!.setValue(authors);
  }
}
