import { CommonModule, DOCUMENT } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BreadcrumbsModule } from './features/breadcrumbs/breadcrumbs.module';
import { SharedModule } from './shared/shared.module';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { CustomRouteReuseStrategy } from './shared/strategies/custom-route-reuse-strategy';
import { AuthInterceptor } from './services/authentication/auth.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsModule,
    SharedModule,
    RouterModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    TranslateService,
  ],
})
export class AppComponent {
  title = 'angular-gmp-2024';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'de', 'ru']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
