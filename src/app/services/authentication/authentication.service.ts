import { Injectable } from '@angular/core';
import { LoginRequest, TokenRequest } from '../../models/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { map, Observable, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly tokenKey = 'authToken';
  private readonly userKey = 'authUser';
  private readonly apiUrl = 'http://localhost:3004';

  constructor(private http: HttpClient, private router: Router) {}

  login(login: string, password: string): Observable<void> {
    const loginData: LoginRequest = { email: login, password };
    return this.http
      .post<TokenRequest>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        switchMap((response: TokenRequest) => {
          localStorage.setItem(this.tokenKey, response.token);
          return this.getUserInfo().pipe(
            map((user: User) => {
              localStorage.setItem(this.userKey, JSON.stringify(user));
            })
          );
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      return this.http.post<User>(`${this.apiUrl}/auth/userinfo`, { token });
    }
    throw new Error('User is not authenticated');
  }
}
