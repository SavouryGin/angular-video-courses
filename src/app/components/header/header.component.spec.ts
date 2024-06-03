import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LogoComponent } from '../logo/logo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, ButtonComponent, LogoComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleLogin when the "User login" button is clicked', () => {
    const loginButtonDebugElement = fixture.debugElement.query(
      By.css('.header_user-actions .header_button:first-child')
    );
    const loginButtonNativeElement =
      loginButtonDebugElement.nativeElement.querySelector('button');

    spyOn(component, 'handleLogin').and.callThrough();
    spyOn(console, 'log');

    loginButtonNativeElement.click();
    fixture.detectChanges();

    expect(component.handleLogin).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Login button clicked');
  });

  it('should call handleLogOut when the "Log out" button is clicked', () => {
    const logoutButtonDebugElement = fixture.debugElement.query(
      By.css('.header_user-actions .header_button:last-child')
    );
    const logoutButtonNativeElement =
      logoutButtonDebugElement.nativeElement.querySelector('button');

    spyOn(component, 'handleLogOut').and.callThrough();
    spyOn(console, 'log');

    logoutButtonNativeElement.click();
    fixture.detectChanges();

    expect(component.handleLogOut).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Log out button clicked');
  });
});
