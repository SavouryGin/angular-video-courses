import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter';
import { BreadcrumbsModule } from './features/breadcrumbs/breadcrumbs.module';
import { SharedModule } from './shared/shared.module';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './shared/strategies/custom-route-reuse-strategy';
import { HttpClientModule } from '@angular/common/http';

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
    FilterPipe,
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
