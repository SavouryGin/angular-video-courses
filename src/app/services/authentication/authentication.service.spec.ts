import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';
import { User } from '../../models/user';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  const mockUser: User = {
    id: 1,
    fakeToken: 'fakeToken',
    name: { first: 'John', last: 'Doe' },
    email: 'john.doe@example.com',
    password: 'password',
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', [
      'getToken',
      'setToken',
      'removeToken',
      'setUser',
      'removeUser',
      'getUser',
      'isAuthenticated',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: UserService, useValue: spy },
      ],
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logout', () => {
    it('should clear the token and user from storage', () => {
      userServiceSpy.removeToken.and.stub();
      userServiceSpy.removeUser.and.stub();

      service.logout();

      expect(userServiceSpy.removeToken).toHaveBeenCalled();
      expect(userServiceSpy.removeUser).toHaveBeenCalled();
      expect(service['currentUserSubject'].value).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token is present', () => {
      userServiceSpy.isAuthenticated.and.returnValue(true);
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if token is not present', () => {
      userServiceSpy.isAuthenticated.and.returnValue(false);
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('getUserInfo', () => {
    it('should return user information if token is present', () => {
      userServiceSpy.getToken.and.returnValue('fakeToken');

      service.getUserInfo().subscribe((user) => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/auth/userinfo`);
      expect(req.request.method).toBe('POST');
      req.flush(mockUser);
    });

    it('should throw an error if token is not present', () => {
      userServiceSpy.getToken.and.returnValue(null);

      expect(() => service.getUserInfo()).toThrowError(
        'User is not authenticated'
      );
    });
  });
});
