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

    const urlSegments = this.router.url.split('/').filter((segment) => segment);
    let uuidRegex = /^[a-z,0-9,-]{36,36}$/;
    const isAddNewCoursePage =
      urlSegments.length === 2 && urlSegments[1] === 'new';
    const isEditCoursePage =
      urlSegments.length === 2 && uuidRegex.test(urlSegments[1]);

    if (isAddNewCoursePage) {
      this.breadcrumbs.push({ label: 'Add New Course', url: this.router.url });
    }

    if (isEditCoursePage) {
      this.breadcrumbs.push({ label: 'Edit Course', url: this.router.url });
    }
  }
}
