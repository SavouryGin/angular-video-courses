import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
    localStorage.clear(); // Clear localStorage before each test
  });

  afterEach(() => {
    localStorage.clear(); // Clear localStorage after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store user info and token on login', () => {
    service.login('testUser', 'password');
    const storedToken = localStorage.getItem('authToken');
    const storedUserInfo = localStorage.getItem('authUser');

    expect(storedToken).toBe('fake-jwt-token');
    expect(storedUserInfo).toBe(JSON.stringify({ username: 'testUser' }));
  });

  it('should remove user info and token on logout', () => {
    service.login('testUser', 'password');
    service.logout();

    const storedToken = localStorage.getItem('authToken');
    const storedUserInfo = localStorage.getItem('authUser');

    expect(storedToken).toBeNull();
    expect(storedUserInfo).toBeNull();
  });

  it('should return true if authenticated', () => {
    service.login('testUser', 'password');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return user info if authenticated', () => {
    service.login('testUser', 'password');
    const userInfo = service.getUserInfo();

    expect(userInfo).toEqual({ username: 'testUser' });
  });

  it('should return null if not authenticated', () => {
    const userInfo = service.getUserInfo();

    expect(userInfo).toBeNull();
  });
});
