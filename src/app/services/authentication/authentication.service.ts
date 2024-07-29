import { Injectable } from '@angular/core';
import { LoginRequest, TokenRequest } from '../../models/login';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    const token = this.userService.getToken();
    if (token) {
      this.getUserInfo().subscribe((user) =>
        this.currentUserSubject.next(user)
      );
    }
  }

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
              this.currentUserSubject.next(user);
            })
          );
        })
      );
  }

  logout(): void {
    this.userService.removeToken();
    this.userService.removeUser();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  isAuthenticatedObservable(): Observable<boolean> {
    if (this.isAuthenticated()) {
      return of(true);
    } else {
      return of(false);
    }
  }

  getUserInfo(): Observable<User> {
    const token = this.userService.getToken();
    if (token) {
      return this.http.post<User>(`${this.apiUrl}/auth/userinfo`, { token });
    }
    throw new Error('User is not authenticated');
  }
}
