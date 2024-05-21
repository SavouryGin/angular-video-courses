import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  handleLogin() {
    // Placeholder for login logic
    console.log('Login button clicked');
  }

  handleLogOut() {
    // Placeholder for log off logic
    console.log('Log out button clicked');
  }
}
