import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import * as AuthActions from '../../../store/auth/auth.actions';
import { AppState } from '../../../store/app.state';
import { DebugElement } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent, ButtonComponent],
      imports: [FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch login action with email and password on handleLogin', () => {
    const email = 'test@example.com';
    const password = 'password123';
    component.email = email;
    component.password = password;

    spyOn(store, 'dispatch');

    component.handleLogin();

    expect(component.errorMessage).toBe('');
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.login({ email, password })
    );
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

  it('should display error message when errorMessage is set', () => {
    const errorMessage = 'Invalid login credentials';
    component.errorMessage = errorMessage;
    fixture.detectChanges();

    const errorElement: DebugElement = fixture.debugElement.query(
      By.css('.login-container_error-message')
    );
    expect(errorElement.nativeElement.textContent).toContain(errorMessage);
  });
});
