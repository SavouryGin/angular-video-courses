import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { ButtonComponent } from './components/button/button.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { CourseBorderDirective } from './directives/course-border/course-border.directive';
import { DurationPipe } from './pipes/duration';
import { OrderByPipe } from './pipes/order-by';
import { FilterPipe } from './pipes/filter';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesPageComponent,
    ButtonComponent,
    BreadcrumbsComponent,
    ToolbarComponent,
    CourseTileComponent,
    CourseBorderDirective,
    DurationPipe,
    OrderByPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [FilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
