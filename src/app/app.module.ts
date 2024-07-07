import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { ButtonComponent } from './components/button/button.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { CourseBorderDirective } from './directives/course-border/course-border.directive';
import { DurationPipe } from './pipes/duration';
import { OrderByPipe } from './pipes/order-by';
import { FilterPipe } from './pipes/filter';
import { BreadcrumbsModule } from './features/breadcrumbs/breadcrumbs.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { NumericInputComponent } from './components/numeric-input/numeric-input.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    CoursesPageComponent,
    ButtonComponent,
    ToolbarComponent,
    CourseTileComponent,
    CourseBorderDirective,
    DurationPipe,
    OrderByPipe,
    LoginPageComponent,
    TextInputComponent,
    TextAreaComponent,
    NumericInputComponent,
    AddCourseComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BreadcrumbsModule],
  providers: [FilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
