import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseForm } from './course-form.component';
import { CoursesService } from '../../../services/courses/courses.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Course } from '../../../models/course';
import { SharedModule } from '../../../shared/shared.module';

class MockCoursesService {
  getCourseById(id: string): Course | undefined {
    return {
      id,
      title: 'Existing Course',
      description: 'Course Description',
      creationDate: new Date(),
      duration: 120,
      topRated: false,
    };
  }
  createCourse(course: Course) {}
  updateCourse(course: Course) {}
}

describe('CourseForm', () => {
  let component: CourseForm;
  let fixture: ComponentFixture<CourseForm>;
  let coursesService: CoursesService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, FormsModule, SharedModule],
      declarations: [CourseForm],
      providers: [
        { provide: CoursesService, useClass: MockCoursesService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => '1' } },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseForm);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with course data in edit mode', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.title).toBe('Existing Course');
    expect(component.description).toBe('Course Description');
    expect(component.date).toBe(new Date().toISOString().split('T')[0]);
    expect(component.duration).toBe(120);
  });

  it('should call createCourse and navigate on handleSave in add mode', () => {
    component.isEditMode = false;
    spyOn(coursesService, 'createCourse');

    component.title = 'New Course';
    component.description = 'New Description';
    component.date = '2024-12-25';
    component.duration = 90;
    component.handleSave();

    expect(coursesService.createCourse).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'New Course',
        description: 'New Description',
        creationDate: new Date('2024-12-25'),
        duration: 90,
      })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call updateCourse and navigate on handleSave in edit mode', () => {
    component.isEditMode = true;
    spyOn(coursesService, 'updateCourse');

    component.title = 'Updated Course';
    component.description = 'Updated Description';
    component.date = '2024-12-25';
    component.duration = 100;
    component.handleSave();

    expect(coursesService.updateCourse).toHaveBeenCalledWith(
      jasmine.objectContaining({
        id: '1',
        title: 'Updated Course',
        description: 'Updated Description',
        creationDate: new Date('2024-12-25'),
        duration: 100,
      })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call router.navigate on handleCancel', () => {
    component.handleCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should bind inputs to class properties', () => {
    const compiled = fixture.nativeElement;
    const titleInput = compiled.querySelector('#course-form-title input');
    const descriptionInput = compiled.querySelector(
      '#course-form-description textarea'
    );
    const dateInput = compiled.querySelector('#course-form-date input');
    const durationInput = compiled.querySelector('#course-form-duration input');

    titleInput.value = 'New Title';
    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.value = 'New Description';
    descriptionInput.dispatchEvent(new Event('input'));
    dateInput.value = '2024-12-25';
    dateInput.dispatchEvent(new Event('input'));
    durationInput.value = '90';
    durationInput.dispatchEvent(new Event('input'));

    expect(component.title).toBe('New Title');
    expect(component.description).toBe('New Description');
    expect(component.date).toBe('2024-12-25');
    expect(component.duration).toBe('90');
  });
});
