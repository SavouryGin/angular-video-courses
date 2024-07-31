import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { User } from '../../models/user';
import { AppState } from '../../store/app.state';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenService } from '../../services/token/token.service';
import * as AuthActions from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getUserInfo(token).subscribe((user: User) => {
        this.store.dispatch(AuthActions.setUser({ user }));
      });
    }
  }

  handleLogout() {
    this.authService.logout();
  }
}
