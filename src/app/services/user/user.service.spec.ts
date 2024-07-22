import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get token', () => {
    service.setToken('testToken');
    expect(service.getToken()).toBe('testToken');
  });

  it('should remove token', () => {
    service.setToken('testToken');
    service.removeToken();
    expect(service.getToken()).toBeNull();
  });

  it('should set and get user', () => {
    const user = { id: 1, name: 'Test User' };
    service.setUser(user);
    expect(service.getUser()).toEqual(user);
  });

  it('should remove user', () => {
    const user = { id: 1, name: 'Test User' };
    service.setUser(user);
    service.removeUser();
    expect(service.getUser()).toBeNull();
  });

  it('should return true if authenticated', () => {
    service.setToken('testToken');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false if not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });
});
