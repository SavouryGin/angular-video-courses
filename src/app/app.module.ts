import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from './features/breadcrumbs/breadcrumbs.module';
import { SharedModule } from './shared/shared.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './shared/strategies/custom-route-reuse-strategy';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/authentication/auth.interceptor';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, LogoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BreadcrumbsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
