import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseFormComponent } from './course-form.component';
import { CoursesService } from '../../../services/courses/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Course } from '../../../models/course';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let router: Router;
  let route: ActivatedRoute;

  const mockCourse: Course = {
    id: '1',
    name: 'Course 1',
    description: 'Description',
    date: new Date().toISOString(),
    length: 120,
    isTopRated: false,
    authors: [],
  };

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
      'getCourseById',
      'updateCourse',
      'createCourse',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CourseFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1', // Mocking course ID for testing
              },
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(
      CoursesService
    ) as jasmine.SpyObj<CoursesService>;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load course details in edit mode', () => {
    coursesService.getCourseById.and.returnValue(of(mockCourse));
    component.ngOnInit();
    expect(component.isEditMode).toBe(true);
    expect(component.title).toBe(mockCourse.name);
    expect(component.date).toBe(mockCourse.date.split('T')[0]);
    expect(component.duration).toBe(mockCourse.length);
  });

  it('should handle error when loading course details', () => {
    coursesService.getCourseById.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(component.errorMessage).toBe('Failed to load course details');
  });

  it('should update existing course', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    coursesService.updateCourse.and.returnValue(of(mockCourse));
    component.courseId = '1';
    component.updateCourse();
    expect(coursesService.updateCourse).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error when updating course', () => {
    coursesService.updateCourse.and.returnValue(throwError('Error'));
    component.courseId = '1';
    component.updateCourse();
    expect(component.errorMessage).toBe('Failed to update course');
  });

  it('should add new course', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    coursesService.createCourse.and.returnValue(of(mockCourse));
    component.addCourse();
    expect(coursesService.createCourse).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should handle error when adding new course', () => {
    coursesService.createCourse.and.returnValue(throwError('Error'));
    component.addCourse();
    expect(component.errorMessage).toBe('Failed to add course');
  });

  it('should navigate to root path on cancel', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    component.handleCancel();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });
});
