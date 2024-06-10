import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button.component';
import { CourseTileComponent } from './course-tile.component';
import { CourseBorderDirective } from '../../directives/course-border/course-border.directive';
import { DurationPipe } from '../../pipes/duration-pipe';

describe('CourseTileComponent', () => {
  let component: CourseTileComponent;
  let fixture: ComponentFixture<CourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CourseTileComponent,
        ButtonComponent,
        CourseBorderDirective,
        DurationPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseTileComponent);
    component = fixture.componentInstance;
    component.course = {
      id: '1',
      title: 'Test Course',
      creationDate: new Date('2023-01-01'),
      duration: 88,
      description: 'Test description',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the formatted duration using the duration pipe', () => {
    const mockCourse = {
      id: '1',
      title: 'Angular Course',
      creationDate: new Date(),
      duration: 75,
      description: 'Learn Angular',
      topRated: true,
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const durationElement = fixture.debugElement.query(
      By.css('.course-tile_info p')
    ).nativeElement;
    expect(durationElement.textContent).toContain('1h 15min');
  });

  it('should display the formatted creation date using the built-in date pipe', () => {
    const mockCourse = {
      id: '1',
      title: 'Angular Course',
      creationDate: new Date('2023-12-11'),
      duration: 120,
      description: 'Learn Angular',
      topRated: true,
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const dateElement = fixture.debugElement.query(
      By.css('.course-tile_info p:nth-child(2)')
    ).nativeElement;
    expect(dateElement.textContent).toContain('12/11/2023');
  });

  it('should display course description', () => {
    const descriptionElement = fixture.debugElement.queryAll(By.css('p'))[2]
      .nativeElement;
    expect(descriptionElement.textContent).toContain('Test description');
  });

  it('should display the star icon for top-rated courses', () => {
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

    const svgElement = fixture.debugElement.query(By.css('svg'));
    expect(svgElement).toBeTruthy();
  });

  it('should not display the star icon for non-top-rated courses', () => {
    const mockCourse = {
      id: '2',
      title: 'React Course',
      creationDate: new Date(),
      duration: 90,
      description: 'Learn React',
      topRated: false,
    };

    component.course = mockCourse;
    fixture.detectChanges();

    const svgElement = fixture.debugElement.query(By.css('svg'));
    expect(svgElement).toBeFalsy();
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
