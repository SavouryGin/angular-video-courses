import { Component } from '@angular/core';
import { AppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private store: Store<AppState>) {}

  handleLogin() {
    this.errorMessage = ''; // Clear any previous error message
    this.store.dispatch(
      AuthActions.login({ email: this.email, password: this.password })
    );
  }
}
