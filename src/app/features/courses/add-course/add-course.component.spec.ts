import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourseComponent } from './add-course.component';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesService } from '../../../services/courses/courses.service';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const coursesServiceMock = jasmine.createSpyObj('CoursesService', [
      'createCourse',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      imports: [FormsModule, SharedModule],
      providers: [
        { provide: CoursesService, useValue: coursesServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    coursesServiceSpy = TestBed.inject(
      CoursesService
    ) as jasmine.SpyObj<CoursesService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleSave and navigate to courses page', () => {
    component.title = 'Test Course';
    component.description = 'Test Description';
    component.date = '2024-12-31';
    component.duration = 120;

    component.handleSave();

    expect(coursesServiceSpy.createCourse).toHaveBeenCalledWith(
      jasmine.objectContaining({
        title: 'Test Course',
        description: 'Test Description',
        creationDate: new Date('2024-12-31'),
        duration: 120,
      })
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call handleCancel and navigate to courses page', () => {
    component.handleCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
