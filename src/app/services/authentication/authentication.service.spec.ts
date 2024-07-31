import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { User } from '../../models/user';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let store: MockStore;
  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, provideMockStore({ initialState })],
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store) as MockStore;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set token and user', () => {
    const tokenResponse = { token: 'testToken' };
    const userResponse = {
      id: 1,
      fakeToken: 'fakeToken',
      name: { first: 'John', last: 'Doe' },
      email: 'john.doe@example.com',
      password: 'password',
    };

    spyOn(store, 'dispatch').and.callThrough();

    service.login('test@test.com', 'password').subscribe((user) => {
      expect(user).toEqual(userResponse);
      expect(store.dispatch).toHaveBeenCalledWith(
        AuthActions.loginSuccess({ user: userResponse })
      );
    });

    const loginReq = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(tokenResponse);

    const userReq = httpMock.expectOne(`${environment.apiUrl}/auth/userinfo`);
    expect(userReq.request.method).toBe('POST');
    userReq.flush(userResponse);
  });

  it('should logout and dispatch logout action', () => {
    spyOn(store, 'dispatch').and.callThrough();

    service.logout();

    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.logout());
  });

  it('should get user info', () => {
    const token = 'testToken';
    const userResponse: User = {
      id: 2,
      fakeToken: 'testToken',
      name: {
        first: 'Brock',
        last: 'Beasley',
      },
      email: 'foo@epam.com',
      password: 'testPassword',
    };

    service.getUserInfo(token).subscribe((user) => {
      expect(user).toEqual(userResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/userinfo`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  });
});
