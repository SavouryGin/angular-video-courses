import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) {}

  showUserInfo(): boolean {
    return (
      !this.router.url.includes('login') && this.authService.isAuthenticated()
    );
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserInfo() {
    return this.authService.getUserInfo();
  }
}
