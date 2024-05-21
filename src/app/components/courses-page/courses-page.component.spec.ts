import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursesPageComponent } from './courses-page.component';
import { CourseTileComponent } from '../course-tile/course-tile.component';
import { COURSES_LIST } from '../../../__mocks__/course-list';
import { ButtonComponent } from '../button/button.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        CourseTileComponent,
        ButtonComponent,
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
});
