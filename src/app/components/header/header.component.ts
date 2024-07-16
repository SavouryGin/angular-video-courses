import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.user$ = this.authService.getUserInfo();
  }

  showUserInfo(): boolean {
    return this.authService.isAuthenticated();
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
