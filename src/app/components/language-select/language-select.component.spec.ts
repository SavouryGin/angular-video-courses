import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectComponent } from './language-select.component';
import { TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

// Mock Translate Pipe
@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('LanguageSelectComponent', () => {
  let component: LanguageSelectComponent;
  let fixture: ComponentFixture<LanguageSelectComponent>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let selectElement: DebugElement;

  beforeEach(async () => {
    const translateSpy = jasmine.createSpyObj('TranslateService', [
      'use',
      'get',
      'stream',
    ]);

    await TestBed.configureTestingModule({
      declarations: [LanguageSelectComponent, MockTranslatePipe],
      imports: [FormsModule],
      providers: [{ provide: TranslateService, useValue: translateSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;

    // Mock the translation stream for the "languageLabel"
    translateService.get.and.callFake((key: string) =>
      of(key === 'languageLabel' ? 'Language' : key)
    );
    translateService.stream.and.callFake((key: string) =>
      of(key === 'languageLabel' ? 'Language' : key)
    );

    fixture.detectChanges();

    selectElement = fixture.debugElement.query(By.css('select'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display language options', () => {
    const options = selectElement.queryAll(By.css('option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent).toContain('English');
    expect(options[1].nativeElement.textContent).toContain('German');
    expect(options[2].nativeElement.textContent).toContain('Russian');
  });

  it('should call translate.use() with the selected language', () => {
    const event = new Event('change');
    (selectElement.nativeElement as HTMLSelectElement).value = 'de';
    selectElement.nativeElement.dispatchEvent(event);

    expect(translateService.use).toHaveBeenCalledOnceWith('de');
  });

  it('should translate the language label', () => {
    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toBe('languageLabel');
  });
});
