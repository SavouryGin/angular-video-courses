import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HeaderComponent } from './header.component';
import { AppState } from '../../store/app.state';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { User } from '../../models/user';
import { MemoizedSelector, Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../button/button.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<AppState>;
  let mockSelectCurrentUser: MemoizedSelector<AppState, User | null>;
  let authService: jasmine.SpyObj<AuthenticationService>;

  const initialState = {
    auth: {
      user: null,
      token: null,
      isAuthenticated: false,
    },
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
      'logout',
    ]);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent, ButtonComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthenticationService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore<AppState>;
    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockSelectCurrentUser = store.overrideSelector(selectCurrentUser, null);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the current user from the store', () => {
    const user: User = {
      id: 1,
      email: 'test@test.com',
      name: { first: 'Test', last: 'User' },
      password: 'testPassword',
      fakeToken: 'testToken',
    };
    mockSelectCurrentUser.setResult(user);
    store.refreshState();
    fixture.detectChanges();

    component.user$.subscribe((result) => {
      expect(result).toEqual(user);
    });

    const userInfoElement: DebugElement = fixture.debugElement.query(
      By.css('.header_user-info')
    );
    expect(userInfoElement.nativeElement.textContent).toContain(user.email);
  });

  it('should call logout method on button click', () => {
    const user: User = {
      id: 1,
      email: 'test@test.com',
      name: { first: 'Test', last: 'User' },
      password: 'testPassword',
      fakeToken: 'testToken',
    };
    mockSelectCurrentUser.setResult(user);
    store.refreshState();
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('.header_button'));
    logoutButton.triggerEventHandler('onClick', null);

    expect(authService.logout).toHaveBeenCalled();
  });
});
