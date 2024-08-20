import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenService } from '../../services/token/token.service';
import { AppState } from '../../store/app.state';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { User } from '../../models/user';
import { of } from 'rxjs';
import { LogoComponent } from '../logo/logo.component';
import { ButtonComponent } from '../button/button.component';
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageSelectComponent } from '../language-select/language-select.component';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<AppState>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let tokenService: jasmine.SpyObj<TokenService>;
  let translateService: jasmine.SpyObj<TranslateService>;

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
    const translateSpy = jasmine.createSpyObj('TranslateService', [
      'use',
      'get',
      'stream',
    ]);
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);

    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        LogoComponent,
        ButtonComponent,
        MockTranslatePipe,
        LanguageSelectComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: TranslateService, useValue: translateSpy },
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
