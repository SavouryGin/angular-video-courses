import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { User } from '../../models/user';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../button/button.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: jasmine.SpyObj<AuthenticationService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthenticationService', [
      'getUserInfo',
      'isAuthenticated',
      'logout',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent, ButtonComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    authServiceMock = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getUserInfo and set user$', () => {
      const user: User = {
        id: 1,
        fakeToken: 'fake-jwt-token',
        name: { first: 'John', last: 'Doe' },
        email: 'john.doe@example.com',
        password: 'password',
      };

      authServiceMock.getUserInfo.and.returnValue(of(user));

      fixture.detectChanges();

      component.user$.subscribe((u) => {
        expect(u).toEqual(user);
      });

      expect(authServiceMock.getUserInfo).toHaveBeenCalled();
    });

    it('should handle error if getUserInfo fails', () => {
      authServiceMock.getUserInfo.and.returnValue(
        throwError('User not authenticated')
      );

      fixture.detectChanges();

      component.user$.subscribe({
        error: (err) => {
          expect(err).toEqual('User not authenticated');
        },
      });

      expect(authServiceMock.getUserInfo).toHaveBeenCalled();
    });
  });

  describe('showUserInfo', () => {
    it('should return true if the user is authenticated', () => {
      authServiceMock.isAuthenticated.and.returnValue(true);

      expect(component.showUserInfo()).toBe(true);
    });

    it('should return false if the user is not authenticated', () => {
      authServiceMock.isAuthenticated.and.returnValue(false);

      expect(component.showUserInfo()).toBe(false);
    });
  });

  describe('handleLogout', () => {
    it('should call logout and navigate to login', () => {
      component.handleLogout();

      expect(authServiceMock.logout).toHaveBeenCalled();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('template', () => {
    it('should display user info if authenticated', () => {
      const user: User = {
        id: 1,
        fakeToken: 'fake-jwt-token',
        name: { first: 'John', last: 'Doe' },
        email: 'john.doe@example.com',
        password: 'password',
      };

      authServiceMock.getUserInfo.and.returnValue(of(user));
      authServiceMock.isAuthenticated.and.returnValue(true);

      fixture.detectChanges();

      const userInfoElement = fixture.debugElement.query(
        By.css('.header_user-info')
      );
      expect(userInfoElement.nativeElement.textContent.trim()).toBe(user.email);
    });

    it('should not display user info if not authenticated', () => {
      authServiceMock.isAuthenticated.and.returnValue(false);

      fixture.detectChanges();

      const userInfoElement = fixture.debugElement.query(
        By.css('.header_user-info')
      );
      expect(userInfoElement).toBeNull();
    });
  });
});
