import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../../guards/auth.guard';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseForm } from './course-form/course-form.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CourseTileComponent } from '../../components/course-tile/course-tile.component';
import { CourseBorderDirective } from '../../directives/course-border/course-border.directive';
import { DurationPipe } from '../../pipes/duration';
import { OrderByPipe } from '../../pipes/order-by';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'new',
    component: CourseForm,
    canActivate: [authGuard],
  },
  {
    path: ':id',
    component: CourseForm,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseForm,
    CourseTileComponent,
    CourseBorderDirective,
    DurationPipe,
    OrderByPipe,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
  ],
})
export class CoursesModule {}