import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorsInputComponent } from './authors-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CoursesService } from '../../../services/courses/courses.service';
import { Author } from '../../../models/course';
import { FormTextInputComponent } from '../../../components/form-text-input/form-text-input.component';
import { FormFieldComponent } from '../../../components/form-field/form-field.component';

class MockCoursesService {
  getAuthors(query: string) {
    const authors: Author[] = [
      { id: '1', name: 'Author 1', lastName: 'Last 1' },
      { id: '2', name: 'Author 2', lastName: 'Last 2' },
    ];
    return of(
      authors.filter((author) =>
        author.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }
}

describe('AuthorsInputComponent', () => {
  let component: AuthorsInputComponent;
  let fixture: ComponentFixture<AuthorsInputComponent>;
  let coursesService: CoursesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AuthorsInputComponent,
        FormTextInputComponent,
        FormFieldComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CoursesService, useClass: MockCoursesService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    coursesService = TestBed.inject(CoursesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display authors based on search query', (done) => {
    component.authorSearchControl.setValue('author');
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      const authors = fixture.debugElement.queryAll(By.css('.authors-list li'));
      expect(authors.length).toBeGreaterThan(0);
      expect(authors[0].nativeElement.textContent).toContain('Author 1');
      done();
    }, 500);
  });

  it('should select an author', () => {
    const author: Author = { id: '1', name: 'Author 1', lastName: 'Last 1' };
    component.handleAuthorSelect(author);
    fixture.detectChanges();

    expect(component.selectedAuthors).toContain(author);
    const selectedAuthors = fixture.debugElement.queryAll(
      By.css('.selected-authors span')
    );
    expect(selectedAuthors.length).toBe(1);
    expect(selectedAuthors[0].nativeElement.textContent).toContain(
      'Author 1 Last 1'
    );
  });

  it('should remove a selected author', () => {
    const author: Author = { id: '1', name: 'Author 1', lastName: 'Last 1' };
    component.selectedAuthors = [author];
    fixture.detectChanges();

    component.handleAuthorRemove(author);
    fixture.detectChanges();

    expect(component.selectedAuthors).not.toContain(author);
    const selectedAuthors = fixture.debugElement.queryAll(
      By.css('.selected-authors span')
    );
    expect(selectedAuthors.length).toBe(0);
  });

  it('should emit selectedAuthorsChange on author selection and removal', () => {
    spyOn(component.selectedAuthorsChange, 'emit');

    const author: Author = { id: '1', name: 'Author 1', lastName: 'Last 1' };
    component.handleAuthorSelect(author);
    expect(component.selectedAuthorsChange.emit).toHaveBeenCalledWith([author]);

    component.handleAuthorRemove(author);
    expect(component.selectedAuthorsChange.emit).toHaveBeenCalledWith([]);
  });

  it('should hide dropdown when no query is entered', () => {
    component.authorSearchControl.setValue('');
    fixture.detectChanges();

    expect(component.showDropdown).toBeFalse();
    const dropdown = fixture.debugElement.query(By.css('.authors-list'));
    expect(dropdown).toBeNull();
  });
});
