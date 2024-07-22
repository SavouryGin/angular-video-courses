import { Injectable } from '@angular/core';
import { LoginRequest, TokenRequest } from '../../models/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  login(login: string, password: string): Observable<User> {
    const loginData: LoginRequest = { email: login, password };
    return this.http
      .post<TokenRequest>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        switchMap((response: TokenRequest) => {
          this.userService.setToken(response.token);
          return this.getUserInfo().pipe(
            tap((user: User) => {
              this.userService.setUser(user);
            })
          );
        })
      );
  }

  logout(): void {
    this.userService.removeToken();
    this.userService.removeUser();
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  getUserInfo(): Observable<User> {
    const token = this.userService.getToken();
    if (token) {
      return this.http.post<User>(`${this.apiUrl}/auth/userinfo`, { token });
    }
    throw new Error('User is not authenticated');
  }
}
