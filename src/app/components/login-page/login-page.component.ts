import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  handleLogin() {
    this.authService.login(this.email, this.password);
    this.router.navigate(['/courses']);
  }
}
