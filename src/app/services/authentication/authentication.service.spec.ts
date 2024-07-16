import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { LoginRequest, TokenRequest } from '../../models/login';
import { User } from '../../models/user';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear();
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should save token and user info on successful login', () => {
      const loginData: LoginRequest = {
        email: 'test@example.com',
        password: 'password',
      };
      const tokenResponse: TokenRequest = { token: 'fake-jwt-token' };
      const userResponse: User = {
        id: 1,
        fakeToken: 'fake-jwt-token',
        name: { first: 'John', last: 'Doe' },
        email: 'test@example.com',
        password: 'password',
      };

      service.login(loginData.email, loginData.password).subscribe();

      const loginRequest = httpMock.expectOne(
        `${service['apiUrl']}/auth/login`
      );
      expect(loginRequest.request.method).toBe('POST');
      expect(loginRequest.request.body).toEqual(loginData);
      loginRequest.flush(tokenResponse);

      const userInfoRequest = httpMock.expectOne(
        `${service['apiUrl']}/auth/userinfo`
      );
      expect(userInfoRequest.request.method).toBe('POST');
      expect(userInfoRequest.request.body).toEqual({
        token: tokenResponse.token,
      });
      userInfoRequest.flush(userResponse);

      expect(localStorage.getItem(service['tokenKey'])).toBe(
        tokenResponse.token
      );
      expect(localStorage.getItem(service['userKey'])).toBe(
        JSON.stringify(userResponse)
      );
    });

    it('should handle login error', () => {
      const loginData: LoginRequest = {
        email: 'test@example.com',
        password: 'password',
      };
      const errorMessage = 'Login failed';

      service.login(loginData.email, loginData.password).subscribe({
        error: (err) => {
          expect(err).toBeTruthy();
        },
      });

      const loginRequest = httpMock.expectOne(
        `${service['apiUrl']}/auth/login`
      );
      loginRequest.flush(
        { message: errorMessage },
        { status: 401, statusText: 'Unauthorized' }
      );
    });
  });

  describe('#logout', () => {
    it('should remove token and user info from localStorage', () => {
      localStorage.setItem(service['tokenKey'], 'fake-jwt-token');
      localStorage.setItem(
        service['userKey'],
        JSON.stringify({ username: 'testuser' })
      );

      service.logout();

      expect(localStorage.getItem(service['tokenKey'])).toBeNull();
      expect(localStorage.getItem(service['userKey'])).toBeNull();
    });
  });

  describe('#isAuthenticated', () => {
    it('should return true if token exists in localStorage', () => {
      localStorage.setItem(service['tokenKey'], 'fake-jwt-token');
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false if token does not exist in localStorage', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('#getUserInfo', () => {
    it('should return user info if token exists', () => {
      const token = 'fake-jwt-token';
      const userResponse: User = {
        id: 1,
        fakeToken: 'fake-jwt-token',
        name: { first: 'John', last: 'Doe' },
        email: 'test@example.com',
        password: 'password',
      };

      localStorage.setItem(service['tokenKey'], token);

      service.getUserInfo().subscribe((user) => {
        expect(user).toEqual(userResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/auth/userinfo`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ token });
      req.flush(userResponse);
    });

    it('should throw error if token does not exist', () => {
      expect(() => service.getUserInfo()).toThrowError(
        'User is not authenticated'
      );
    });
  });
});
