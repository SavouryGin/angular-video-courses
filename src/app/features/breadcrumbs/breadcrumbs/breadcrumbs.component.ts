import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  breadcrumbs: { label: string; url: string }[] = [];

  constructor(public router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setBreadcrumbs();
      });
  }

  showBreadcrumbs(): boolean {
    return !this.router.url.includes('login');
  }

  setBreadcrumbs() {
    const rootUrl = '/';
    this.breadcrumbs = [{ label: 'Courses', url: rootUrl }];

    if (this.router.url.includes('courses/add')) {
      this.breadcrumbs.push({ label: 'Add Course', url: this.router.url });
    }
  }
}
