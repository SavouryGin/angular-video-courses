import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/courses/courses.service';
import { Course } from '../../../models/course';

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
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id') ?? undefined;

    if (this.courseId) {
      this.isEditMode = true;
      this.coursesService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.title = course.name;
          this.description = course.description ?? '';
          this.date = new Date(course.date).toISOString().split('T')[0];
          this.duration = course.length;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load course details';
          console.error('Error loading course details', error);
        },
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

    this.coursesService.updateCourse(updatedCourse).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to update course';
        console.error('Error updating course', error);
      },
    });
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

    this.coursesService.createCourse(newCourse).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to add course';
        console.error('Error adding course', error);
      },
    });
  }

  handleSave() {
    if (this.isEditMode) {
      this.updateCourse();
    } else {
      this.addCourse();
    }
  }

  handleCancel() {
    this.router.navigate(['/']);
  }
}
