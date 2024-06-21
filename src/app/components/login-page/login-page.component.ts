import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  handleLogin() {
    console.log('Login button clicked');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
