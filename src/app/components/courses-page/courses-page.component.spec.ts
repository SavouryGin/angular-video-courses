import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesPageComponent } from './courses-page.component';
import { CourseTileComponent } from '../course-tile/course-tile.component';
import { COURSES_LIST } from '../../../__mocks__/course-list';
import { ButtonComponent } from '../button/button.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { CourseBorderDirective } from '../../directives/course-border/course-border.directive';
import { DurationPipe } from '../../pipes/duration-pipe';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        CoursesPageComponent,
        CourseTileComponent,
        ButtonComponent,
        ToolbarComponent,
        CourseBorderDirective,
        DurationPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of courses', () => {
    const courseElements = fixture.debugElement.queryAll(
      By.css('app-course-tile')
    );
    expect(courseElements.length).toBe(COURSES_LIST.length);
  });

  it('should pass the correct course to each CourseTileComponent', () => {
    const courseElements = fixture.debugElement.queryAll(
      By.css('app-course-tile')
    );
    courseElements.forEach((courseElement, index) => {
      const courseTileComponent =
        courseElement.componentInstance as CourseTileComponent;
      expect(courseTileComponent.course).toEqual(COURSES_LIST[index]);
    });
  });

  it('should display "No Data" message when no courses are found', () => {
    component.filteredCourses = [];
    fixture.detectChanges();
    const noDataElement = fixture.debugElement.query(By.css('p'));
    expect(noDataElement.nativeElement.textContent).toContain('No Data');
  });

  it('should filter courses based on search query', () => {
    component.onSearch('Angular');
    fixture.detectChanges();
    const filteredCourseElements = fixture.debugElement.queryAll(
      By.css('app-course-tile')
    );
    expect(filteredCourseElements.length).toBe(
      COURSES_LIST.filter((course) =>
        course.title.toLowerCase().includes('angular')
      ).length
    );
  });
});
