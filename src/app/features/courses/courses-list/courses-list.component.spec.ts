import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesListComponent } from './courses-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CourseTileComponent } from '../../../components/course-tile/course-tile.component';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { FilterPipe } from '../../../pipes/filter';
import { OrderByPipe } from '../../../pipes/order-by';
import { DurationPipe } from '../../../pipes/duration';
import { CourseBorderDirective } from '../../../directives/course-border/course-border.directive';
import { COURSES_LIST } from '../../../../__mocks__/course-list';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule],
      declarations: [
        CoursesListComponent,
        CourseTileComponent,
        ToolbarComponent,
        CourseBorderDirective,
        DurationPipe,
        OrderByPipe,
      ],
      providers: [FilterPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
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
        course.name.toLowerCase().includes('angular')
      ).length
    );
  });
});
