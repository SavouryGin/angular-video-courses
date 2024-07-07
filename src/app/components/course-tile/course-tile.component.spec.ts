import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseTileComponent } from './course-tile.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../models/course';
import { ButtonComponent } from '../button/button.component';
import { CourseBorderDirective } from '../../directives/course-border/course-border.directive';
import { DurationPipe } from '../../pipes/duration';

describe('CourseTileComponent', () => {
  let component: CourseTileComponent;
  let fixture: ComponentFixture<CourseTileComponent>;
  let mockCourse: Course;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseTileComponent,
        ButtonComponent,
        CourseBorderDirective,
        DurationPipe,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(CourseTileComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseTileComponent);
    component = fixture.componentInstance;
    mockCourse = {
      id: '1',
      title: 'Test Course',
      description: 'Test Description',
      creationDate: new Date(),
      duration: 120,
      topRated: true,
    };
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course title in uppercase', () => {
    const titleElement: HTMLElement = fixture.debugElement.query(
      By.css('h2')
    ).nativeElement;
    expect(titleElement.textContent).toContain(mockCourse.title.toUpperCase());
  });

  it('should display duration and creation date', () => {
    const infoElements = fixture.debugElement.queryAll(
      By.css('.course-tile_info p')
    );
    const durationElement: HTMLElement = infoElements[0].nativeElement;
    const dateElement: HTMLElement = infoElements[1].nativeElement;

    expect(durationElement.textContent).toContain('Duration:');
    expect(durationElement.textContent).toContain('2h');
    expect(dateElement.textContent).toContain('Creation Date:');
    expect(dateElement.textContent).toContain('07/02/2024');
  });

  it('should display top-rated star if course is top-rated', () => {
    const starElement = fixture.debugElement.query(By.css('svg'));
    expect(starElement).toBeTruthy();
  });

  it('should not display top-rated star if course is not top-rated', () => {
    component.course.topRated = false;
    fixture.detectChanges();

    const starElement = fixture.debugElement.query(By.css('svg'));
    expect(starElement).toBeFalsy();
  });

  it('should display the course title in uppercase', () => {
    const mockCourse = {
      id: '1',
      title: 'Angular Course',
      creationDate: new Date(),
      duration: 120,
      description: 'Learn Angular',
      topRated: true,
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('ANGULAR COURSE');
  });
});
