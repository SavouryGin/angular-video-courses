import { TestBed } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
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
});
