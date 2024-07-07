import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextInputComponent } from './text-input.component';
import { DebugElement } from '@angular/core';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
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
    component.value = 'Test Value';
    fixture.detectChanges();
    expect(inputElement.nativeElement.value).toBe('Test Value');
  });

  it('should emit valueChange event on input', () => {
    spyOn(component.valueChange, 'emit');
    inputElement.nativeElement.value = 'New Value';
    inputElement.triggerEventHandler('input', {
      target: inputElement.nativeElement,
    });
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith('New Value');
  });

  it('should set input attributes correctly', () => {
    component.type = 'email';
    component.name = 'test-name';
    component.id = 'test-id';
    fixture.detectChanges();
    expect(inputElement.nativeElement.type).toBe('email');
    expect(inputElement.nativeElement.name).toBe('test-name');
    expect(inputElement.nativeElement.id).toBe('test-id');
  });
});
