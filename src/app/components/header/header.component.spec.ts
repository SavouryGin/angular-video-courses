import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ButtonComponent } from '../button/button.component';
import { LogoComponent } from '../logo/logo.component';

class MockRouter {
  url = '/';
  navigate = jasmine.createSpy('navigate');
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthenticationService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, ButtonComponent, LogoComponent],
      providers: [
        AuthenticationService,
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router) as any;
    localStorage.clear(); // Clear localStorage before each test
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show user info if authenticated', () => {
    authService.login('testUser', 'password');
    fixture.detectChanges();

    const userInfoElement = fixture.debugElement.query(
      By.css('.header_user-info')
    );
    expect(userInfoElement).toBeTruthy();
    expect(userInfoElement.nativeElement.textContent).toContain('testUser');
  });

  it('should not show user info if not authenticated', () => {
    fixture.detectChanges();

    const userInfoElement = fixture.debugElement.query(
      By.css('.header_user-info')
    );
    expect(userInfoElement).toBeNull();
  });

  it('should return user info correctly', () => {
    authService.login('testUser', 'password');
    expect(component.getUserInfo()?.username).toBe('testUser');
  });
});
