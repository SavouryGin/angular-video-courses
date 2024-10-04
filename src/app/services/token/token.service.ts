import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey = 'authToken';

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {}

  setToken(token: string): void {
    this.localStorage?.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.localStorage?.getItem(this.tokenKey) ?? null;
  }

  removeToken(): void {
    this.localStorage?.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
