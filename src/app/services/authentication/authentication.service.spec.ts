import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let userService: UserService;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        UserService,
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set token and user', () => {
    const tokenResponse = { token: 'testToken' };
    const userResponse = { id: 1, name: 'Test User' };

    service.login('test@test.com', 'password').subscribe(() => {
      expect(userService.getToken()).toBe('testToken');
      expect(userService.getUser()).toEqual(userResponse);
    });

    const loginReq = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(loginReq.request.method).toBe('POST');
    loginReq.flush(tokenResponse);

    const userReq = httpMock.expectOne(`${environment.apiUrl}/auth/userinfo`);
    expect(userReq.request.method).toBe('POST');
    userReq.flush(userResponse);
  });

  it('should logout and clear token and user', () => {
    spyOn(userService, 'removeToken').and.callThrough();
    spyOn(userService, 'removeUser').and.callThrough();

    service.logout();

    expect(userService.removeToken).toHaveBeenCalled();
    expect(userService.removeUser).toHaveBeenCalled();
  });

  it('should return true if authenticated', () => {
    spyOn(userService, 'isAuthenticated').and.returnValue(true);

    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false if not authenticated', () => {
    spyOn(userService, 'isAuthenticated').and.returnValue(false);

    expect(service.isAuthenticated()).toBe(false);
  });

  it('should get user info if authenticated', () => {
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
    spyOn(userService, 'getToken').and.returnValue('testToken');

    service.getUserInfo().subscribe((user) => {
      expect(user).toEqual(userResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/userinfo`);
    expect(req.request.method).toBe('POST');
    req.flush(userResponse);
  });

  it('should throw error if not authenticated when getting user info', () => {
    spyOn(userService, 'getToken').and.returnValue(null);

    expect(() => service.getUserInfo()).toThrowError(
      'User is not authenticated'
    );
  });
});
