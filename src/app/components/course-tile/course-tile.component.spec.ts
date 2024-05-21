import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button.component';
import { CourseTileComponent } from './course-tile.component';

describe('CourseTileComponent', () => {
  let component: CourseTileComponent;
  let fixture: ComponentFixture<CourseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseTileComponent, ButtonComponent],
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

  it('should display course title', () => {
    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toContain('Test Course');
  });

  it('should display formatted duration', () => {
    const durationElement = fixture.debugElement.query(
      By.css('p')
    ).nativeElement;
    expect(durationElement.textContent).toContain('1h 28min');
  });

  it('should display formatted creation date', () => {
    const dateElement = fixture.debugElement.queryAll(By.css('p'))[1]
      .nativeElement;
    expect(dateElement.textContent).toContain('01/01/2023');
  });

  it('should display course description', () => {
    const descriptionElement = fixture.debugElement.queryAll(By.css('p'))[2]
      .nativeElement;
    expect(descriptionElement.textContent).toContain('Test description');
  });
});
