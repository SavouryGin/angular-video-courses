import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NumericInputComponent } from './numeric-input.component';
import { DebugElement } from '@angular/core';

describe('NumericInputComponent', () => {
  let component: NumericInputComponent;
  let fixture: ComponentFixture<NumericInputComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumericInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label', () => {
    const labelElement: HTMLElement = fixture.debugElement.query(
      By.css('label')
    ).nativeElement;
    component.label = 'Test Label';
    component.id = 'test-id';
    fixture.detectChanges();
    expect(labelElement.textContent).toBe('Test Label');
    expect(labelElement.getAttribute('for')).toBe('test-id');
  });

  it('should bind input value correctly', () => {
    component.value = 123;
    fixture.detectChanges();
    expect(inputElement.nativeElement.value).toBe('123');
  });

  it('should emit valueChange event on input', () => {
    spyOn(component.valueChange, 'emit');
    inputElement.nativeElement.value = '456';
    inputElement.triggerEventHandler('input', {
      target: inputElement.nativeElement,
    });
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith('456');
  });

  it('should set input attributes correctly', () => {
    component.name = 'test-name';
    component.id = 'test-id';
    component.min = 0;
    component.max = 100;
    component.step = 5;
    fixture.detectChanges();
    expect(inputElement.nativeElement.name).toBe('test-name');
    expect(inputElement.nativeElement.id).toBe('test-id');
    expect(inputElement.nativeElement.min).toBe('0');
    expect(inputElement.nativeElement.max).toBe('100');
    expect(inputElement.nativeElement.step).toBe('5');
  });
});
