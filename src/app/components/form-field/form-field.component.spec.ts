import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormFieldComponent } from './form-field.component';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.name = 'test';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle value changes', () => {
    spyOn(component, 'registerOnChange').and.callThrough();
    const testValue = 'test value';
    component.writeValue(testValue);
    expect(component.control.value).toBe(testValue);

    const newValue = 'new value';
    component.control.setValue(newValue);
    expect(component.control.value).toBe(newValue);
  });

  it('should display error messages', () => {
    component.required = true;
    component.ngOnInit();
    component.control.markAsTouched();
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.query(
      By.css('.form-field_error-messages')
    );
    expect(errorMessages.nativeElement.textContent).toContain(
      'This field is required.'
    );
  });

  it('should handle date format validation', () => {
    component.type = 'text';
    component.name = 'date';
    component.ngOnInit();

    component.control.setValue('31/12/2024');
    expect(component.control.valid).toBeTrue();

    component.control.setValue('12/31/2024');
    expect(component.control.valid).toBeFalse();

    component.control.setValue('31/13/2024');
    expect(component.control.valid).toBeFalse();
  });

  it('should handle email validation', () => {
    component.type = 'email';
    component.ngOnInit();

    component.control.setValue('test@example.com');
    expect(component.control.valid).toBeTrue();

    component.control.setValue('invalid-email');
    expect(component.control.valid).toBeFalse();
  });

  it('should display different input types', () => {
    component.type = 'number';
    fixture.detectChanges();
    let input = fixture.debugElement.query(By.css('input[type="number"]'));
    expect(input).toBeTruthy();

    component.type = 'textarea';
    fixture.detectChanges();
    let textarea = fixture.debugElement.query(By.css('textarea'));
    expect(textarea).toBeTruthy();

    component.type = 'text';
    fixture.detectChanges();
    input = fixture.debugElement.query(By.css('input[type="text"]'));
    expect(input).toBeTruthy();
  });
});
