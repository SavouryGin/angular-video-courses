import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BreadcrumbsComponent } from './breadcrumbs.component';

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

  it('should have a navigation element with aria-label "Breadcrumb"', () => {
    const navElement = fixture.debugElement.query(By.css('nav'));
    expect(navElement.nativeElement.getAttribute('aria-label')).toBe(
      'Breadcrumb'
    );
  });

  it('should have a list element within the navigation element', () => {
    const olElement = fixture.debugElement.query(By.css('nav ol'));
    expect(olElement).toBeTruthy();
  });

  it('should have a list item with a link to the home page', () => {
    const linkElement = fixture.debugElement.query(By.css('nav ol li a'));
    expect(linkElement.nativeElement.getAttribute('href')).toBe('/');
    expect(linkElement.nativeElement.textContent).toBe('Courses');
  });
});
