import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseFormComponent } from './course-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { FormTextInputComponent } from '../../../components/form-text-input/form-text-input.component';
import { FormTextAreaComponent } from '../../../components/form-text-area/form-text-area.component';
import { FormDateInputComponent } from '../../../components/form-date-input/form-date-input.component';
import { FormNumericInputComponent } from '../../../components/form-numeric-input/form-numeric-input.component';
import { Author, Course } from '../../../models/course';
import { Router } from '@angular/router';
import { AuthorsInputComponent } from '../authors-input/authors-input.component';
import { coursesReducer } from '../../../store/courses/courses.reducer';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ButtonComponent } from '../../../components/button/button.component';
import { FormFieldComponent } from '../../../components/form-field/form-field.component';
import { SharedModule } from '../../../shared/shared.module';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let store: Store<AppState>;
  let router: Router;

  const course: Course = {
    id: '1',
    name: 'Course 1',
    description: 'Course 1 Description',
    date: '2022-01-01T00:00:00Z',
    length: 60,
    isTopRated: false,
    authors: [
      { id: '1', name: 'Author 1', lastName: 'Last 1' },
      { id: '2', name: 'Author 2', lastName: 'Last 2' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [
        CourseFormComponent,
        FormFieldComponent,
        FormTextInputComponent,
        FormTextAreaComponent,
        FormDateInputComponent,
        FormNumericInputComponent,
        AuthorsInputComponent,
        ButtonComponent,
        MockTranslatePipe,
    ],
    imports: [RouterModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ courses: coursesReducer })],
    providers: [
        {
            provide: ActivatedRoute,
            useValue: {
                snapshot: { paramMap: { get: () => '1' } },
            },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture.detectChanges();

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store, 'select').and.returnValue(of([course]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handleSave for adding a course', () => {
    spyOn(router, 'navigate');

    component.isEditMode = false;
    component.courseForm.setValue({
      title: 'New Course',
      description: 'New Course Description',
      date: '02/02/2022',
      duration: '90',
      authors: [],
    });
    component.handleSave();

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(Object)); // Check that an action is dispatched
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should handleSave for updating a course', () => {
    spyOn(router, 'navigate');

    component.isEditMode = true;
    component.courseForm.setValue({
      title: 'Updated Course',
      description: 'Updated Description',
      date: '03/03/2022',
      duration: '120',
      authors: [],
    });
    component.handleSave();

    expect(store.dispatch).toHaveBeenCalledWith(jasmine.any(Object)); // Check that an action is dispatched
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should handleCancel', () => {
    spyOn(router, 'navigate');
    component.handleCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should update authors in the form', () => {
    const authors: Author[] = [
      { id: '3', name: 'Author 3', lastName: 'Last 3' },
    ];
    component.handleSelectedAuthorsChange(authors);
    expect(component.courseForm.get('authors')!.value).toEqual(authors);
  });

  it('should display error message if course not found in edit mode', () => {
    (store.select as jasmine.Spy).and.returnValue(of([]));
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Failed to load course details');
  });
});
