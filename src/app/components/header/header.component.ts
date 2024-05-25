import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  handleLogin() {
    console.log('Login button clicked');
  }

  handleLogOut() {
    console.log('Log out button clicked');
  }
}
