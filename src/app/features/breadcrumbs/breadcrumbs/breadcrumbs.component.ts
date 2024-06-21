import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  constructor(public router: Router) {}

  showBreadcrumbs(): boolean {
    return !this.router.url.includes('login');
  }
}
