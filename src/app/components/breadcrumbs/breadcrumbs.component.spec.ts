import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { By } from '@angular/platform-browser';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Courses" in the breadcrumbs', () => {
    const breadcrumbElement = fixture.debugElement.query(
      By.css('.breadcrumbs a')
    ).nativeElement;
    expect(breadcrumbElement.textContent).toContain('Courses');
  });

  it('should have the correct href attribute', () => {
    const breadcrumbElement = fixture.debugElement.query(
      By.css('.breadcrumbs a')
    ).nativeElement;
    expect(breadcrumbElement.getAttribute('href')).toBe('/');
  });

  it('should have the correct aria-current attribute', () => {
    const breadcrumbElement = fixture.debugElement.query(
      By.css('.breadcrumbs a')
    ).nativeElement;
    expect(breadcrumbElement.getAttribute('aria-current')).toBe('location');
  });
});
