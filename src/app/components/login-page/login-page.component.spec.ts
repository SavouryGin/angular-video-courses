import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoginPageComponent } from './login-page.component';
import { ButtonComponent } from '../button/button.component';

class MockAuthenticationService {
  login(email: string, password: string) {
    return of(true);
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent, ButtonComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when handleLogin is called', () => {
    spyOn(authService, 'login').and.callThrough();
    component.email = 'test@example.com';
    component.password = 'password123';
    component.handleLogin();
    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });

  it('should navigate to /courses after successful login', () => {
    spyOn(router, 'navigate');
    component.handleLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/courses']);
  });

  it('should bind email and password inputs to component properties', () => {
    const emailInput = fixture.nativeElement.querySelector('#email');
    const passwordInput = fixture.nativeElement.querySelector('#password');

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'password123';
    passwordInput.dispatchEvent(new Event('input'));

    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('password123');
  });

  it('should disable login button if email or password is empty', () => {
    component.email = '';
    component.password = '';
    fixture.detectChanges();
    const appButtonComponent =
      fixture.debugElement.nativeElement.querySelector('app-button');
    const loginButton = appButtonComponent.querySelector('button');
    expect(loginButton.disabled).toBeTruthy();

    component.email = 'test@example.com';
    component.password = 'password123';
    fixture.detectChanges();
    expect(loginButton.disabled).toBeFalsy();
  });
});
