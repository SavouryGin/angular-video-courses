import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'authUser';

  login(username: string, password: string): void {
    // TODO: add validation for the username and password.
    const fakeToken = 'fake-jwt-token';
    const fakeUserInfo = { username };

    // Store the fake token and user info in local storage
    localStorage.setItem(this.tokenKey, fakeToken);
    localStorage.setItem(this.userKey, JSON.stringify(fakeUserInfo));
  }

  logout(): void {
    // Remove the token and user info from local storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    // Check if the token exists in local storage
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserInfo(): { username: string } | null {
    // Retrieve the user info from local storage
    const userInfo = localStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
