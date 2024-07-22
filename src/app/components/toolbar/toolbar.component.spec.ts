import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses/courses.service';
import { of, throwError } from 'rxjs';
import { Course } from '../../models/course';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button.component';
import { Router, RouterModule } from '@angular/router';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let coursesServiceSpy: jasmine.SpyObj<CoursesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['getCourses']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent, ButtonComponent],
      imports: [HttpClientTestingModule, RouterModule, FormsModule],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to add course page when add course button is clicked', () => {
    const addCourseButton = fixture.debugElement.query(
      By.css('.toolbar_add-button')
    );
    addCourseButton.triggerEventHandler('onClick', null);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses/new']);
  });

  it('should emit search results on search input change', fakeAsync(() => {
    const searchResults: Course[] = [
      { id: '1', name: 'Test Course' } as Course,
    ];
    coursesServiceSpy.getCourses.and.returnValue(
      of({ content: searchResults, totalLength: 1, page: 0, pageSize: 5 })
    );

    const searchQuery = 'Test';
    spyOn(component.search, 'emit');

    component.onSearchInputChange(searchQuery);
    tick(300); // debounce time

    expect(coursesServiceSpy.getCourses).toHaveBeenCalledWith(
      0,
      5,
      searchQuery
    );
    expect(component.search.emit).toHaveBeenCalledWith(searchResults);
  }));

  it('should not call API for search input shorter than 3 characters', fakeAsync(() => {
    const searchQuery = 'Te';
    component.onSearchInputChange(searchQuery);
    tick(300); // debounce time

    expect(coursesServiceSpy.getCourses).not.toHaveBeenCalled();
  }));

  it('should clear search query and emit initial course list on clear', fakeAsync(() => {
    const initialCourses: Course[] = [
      { id: '1', name: 'Initial Course' } as Course,
    ];
    coursesServiceSpy.getCourses.and.returnValue(
      of({ content: initialCourses, totalLength: 1, page: 0, pageSize: 5 })
    );

    component.searchQuery = 'Test';
    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('.toolbar_clear'));
    expect(clearButton).toBeTruthy();

    spyOn(component.search, 'emit');

    clearButton.triggerEventHandler('click', null);
    tick(300);

    expect(component.searchQuery).toBe('');
    expect(coursesServiceSpy.getCourses).toHaveBeenCalledWith(0, 5, '');
    expect(component.search.emit).toHaveBeenCalledWith(initialCourses);
  }));

  // it('should navigate to add course page on add course button click', () => {
  //   const router = TestBed.inject(RouterTestingModule);
  //   spyOn(router, 'navigate');

  //   const addButton = fixture.debugElement.query(By.css('.toolbar_add-button'));
  //   addButton.triggerEventHandler('click', null);

  //   expect(router.navigate).toHaveBeenCalledWith(['/courses/new']);
  // });

  it('should handle search errors gracefully', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'error');
    coursesServiceSpy.getCourses.and.returnValue(
      throwError(() => new Error('Search error'))
    );

    const searchQuery = 'Test';
    component.onSearchInputChange(searchQuery);
    tick(300); // debounce time

    expect(consoleSpy).toHaveBeenCalledWith(
      'Search error:',
      jasmine.any(Error)
    );
  }));
});
