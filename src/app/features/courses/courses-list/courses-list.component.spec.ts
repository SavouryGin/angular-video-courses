import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../../../services/courses/courses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoursesResponse } from '../../../models/course';
import { RouterModule } from '@angular/router';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let coursesService: CoursesService;

  const mockCoursesResponse: CoursesResponse = {
    content: [
      {
        id: '1',
        name: 'Course 1',
        date: '2023-01-01',
        length: 120,
        authors: [],
      },
      {
        id: '2',
        name: 'Course 2',
        date: '2023-01-02',
        length: 90,
        authors: [],
      },
    ],
    page: 0,
    pageSize: 5,
    totalLength: 2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      imports: [RouterModule, HttpClientTestingModule],
      providers: [CoursesService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load courses on init', () => {
    spyOn(coursesService, 'getCourses').and.returnValue(
      of(mockCoursesResponse)
    );
    component.ngOnInit();
    expect(coursesService.getCourses).toHaveBeenCalledWith(0, 5, '');
    expect(component.courses.length).toBe(2);
  });

  it('should handle error when loading courses', () => {
    spyOn(coursesService, 'getCourses').and.returnValue(
      throwError(() => new Error('Failed to load courses'))
    );
    component.ngOnInit();
    expect(component.errorMessage).toBe('Failed to load courses');
  });

  it('should display "No Data" when courses list is empty', () => {
    component.courses = [];
    fixture.detectChanges();
    const noDataElement: DebugElement = fixture.debugElement.query(
      By.css('.courses-page_no-data')
    );
    expect(noDataElement).toBeTruthy();
  });
});
