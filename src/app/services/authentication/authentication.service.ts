import { Injectable } from '@angular/core';
import { LoginRequest, TokenRequest } from '../../models/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { AppState } from '../../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(login: string, password: string): Observable<User> {
    const loginData: LoginRequest = { email: login, password };
    return this.http
      .post<TokenRequest>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        switchMap((response: TokenRequest) => {
          return this.getUserInfo(response.token).pipe(
            tap((user: User) => {
              this.store.dispatch(
                AuthActions.loginSuccess({ user, token: response.token })
              );
            })
          );
        })
      );
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  getUserInfo(token: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/userinfo`, { token });
  }
}
