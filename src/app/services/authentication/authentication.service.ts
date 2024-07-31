import { Injectable } from '@angular/core';
import { LoginRequest, TokenRequest } from '../../models/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { AppState } from '../../store/app.state';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private tokenService: TokenService
  ) {}

  login(login: string, password: string): Observable<User> {
    const loginData: LoginRequest = { email: login, password };
    console.log('loginData', loginData);
    return this.http
      .post<TokenRequest>(`${this.apiUrl}/auth/login`, loginData)
      .pipe(
        switchMap((response: TokenRequest) => {
          this.tokenService.setToken(response.token);
          return this.getUserInfo(response.token).pipe(
            tap((user: User) => {
              this.store.dispatch(AuthActions.loginSuccess({ user }));
            })
          );
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.store.dispatch(AuthActions.logout());
  }

  getUserInfo(token: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/userinfo`, { token });
  }

  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }

  isAuthenticatedObservable(): Observable<boolean> {
    if (this.isAuthenticated()) {
      return of(true);
    } else {
      return of(false);
    }
  }
}
