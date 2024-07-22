import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { ButtonComponent } from './components/button/button.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { CourseBorderDirective } from './directives/course-border/course-border.directive';
import { DurationPipe } from './pipes/duration';
import { OrderByPipe } from './pipes/order-by';
import { BreadcrumbsModule } from './features/breadcrumbs/breadcrumbs.module';
import { CoursesService } from './services/courses/courses.service';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        FormsModule,
        BreadcrumbsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        ButtonComponent,
        ToolbarComponent,
        CourseTileComponent,
        CourseBorderDirective,
        DurationPipe,
        OrderByPipe,
      ],
      providers: [CoursesService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-gmp-2024'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-gmp-2024');
  });
});
