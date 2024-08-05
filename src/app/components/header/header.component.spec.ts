import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenService } from '../../services/token/token.service';
import { AppState } from '../../store/app.state';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { User } from '../../models/user';
import { of } from 'rxjs';
import * as AuthActions from '../../store/auth/auth.actions';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../button/button.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<AppState>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let tokenService: jasmine.SpyObj<TokenService>;

  const initialState = { auth: { user: null } };
  const mockUser: User = {
    id: 1,
    fakeToken: 'fakeToken',
    name: { first: 'John', last: 'Doe' },
    email: 'john.doe@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
      'getUserInfo',
      'logout',
    ]);
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent, ButtonComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: TokenService, useValue: tokenServiceSpy },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    authService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select user from store on init', () => {
    store.overrideSelector(selectCurrentUser, mockUser);

    component.ngOnInit();

    component.user$.subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should handle logout', () => {
    component.handleLogout();

    expect(authService.logout).toHaveBeenCalled();
  });
});
