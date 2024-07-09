import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 message', () => {
    const heading = compiled.querySelector('h1');
    const paragraph = compiled.querySelector('p');

    expect(heading?.textContent).toContain('404 - Page Not Found');
    expect(paragraph?.textContent).toContain(
      'Sorry, the page you are looking for does not exist.'
    );
  });

  it('should have a link to the home page', () => {
    const link = compiled.querySelector('a');
    expect(link).toBeTruthy();
    expect(link?.getAttribute('routerLink')).toBe('/');
    expect(link?.textContent).toContain('Go back to the home page');
  });
});
