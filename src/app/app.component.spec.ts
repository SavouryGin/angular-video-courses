import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { LanguageSelectComponent } from './components/language-select/language-select.component';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    const translateSpy = jasmine.createSpyObj('TranslateService', [
      'addLangs',
      'setDefaultLang',
      'use',
      'get',
      'stream',
    ]);

    await TestBed.configureTestingModule({
    declarations: [
        AppComponent,
        MockTranslatePipe,
        HeaderComponent,
        FooterComponent,
        LogoComponent,
        LanguageSelectComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [],
    providers: [
        { provide: TranslateService, useValue: translateSpy },
        provideMockStore({}),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;

    // Mock behavior of TranslateService methods
    translateService.addLangs.and.callFake(() => {});
    translateService.setDefaultLang.and.callFake(() => {});
    translateService.use.and.returnValue(of({}));

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'angular-gmp-2024'`, () => {
    expect(component.title).toEqual('angular-gmp-2024');
  });

  it('should call translate service methods on initialization', () => {
    expect(translateService.addLangs).toHaveBeenCalledOnceWith([
      'en',
      'de',
      'ru',
    ]);
    expect(translateService.setDefaultLang).toHaveBeenCalledOnceWith('en');
    expect(translateService.use).toHaveBeenCalledOnceWith('en');
  });
});
