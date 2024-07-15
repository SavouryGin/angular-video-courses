import { CourseBorderDirective } from './course-border.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div
      appCourseBorder
      [date]="date"
      [freshBorderColor]="'green'"
      [upcomingBorderColor]="'blue'"
    ></div>
  `,
})
class TestComponent {
  date!: Date;
}

describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseBorderDirective, TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    divEl = fixture.debugElement.query(By.directive(CourseBorderDirective));
  });

  it('should set green border for fresh course', () => {
    const testComponent = fixture.componentInstance;
    const freshDate = new Date();
    freshDate.setDate(freshDate.getDate() - 2);
    testComponent.date = freshDate;
    fixture.detectChanges();

    const expectedBorder = '2px solid green';
    expect(divEl.nativeElement.style.border).toBe(expectedBorder);
  });

  it('should set blue border for upcoming course', () => {
    const testComponent = fixture.componentInstance;
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    testComponent.date = futureDate;
    fixture.detectChanges();

    const expectedBorder = '2px solid blue';
    expect(divEl.nativeElement.style.border).toBe(expectedBorder);
  });

  it('should not set any border for non-fresh, non-upcoming course', () => {
    const testComponent = fixture.componentInstance;
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 20);
    testComponent.date = pastDate;
    fixture.detectChanges();

    expect(divEl.nativeElement.style.border).toBe('');
  });
});
