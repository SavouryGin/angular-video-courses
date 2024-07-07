import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TextAreaComponent } from './text-area.component';
import { DebugElement } from '@angular/core';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;
  let textAreaElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    textAreaElement = fixture.debugElement.query(By.css('textarea'));
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

  it('should bind textarea value correctly', () => {
    component.value = 'Test Value';
    fixture.detectChanges();
    expect(textAreaElement.nativeElement.value).toBe('Test Value');
  });

  it('should emit valueChange event on input', () => {
    spyOn(component.valueChange, 'emit');
    textAreaElement.nativeElement.value = 'New Value';
    textAreaElement.triggerEventHandler('input', {
      target: textAreaElement.nativeElement,
    });
    fixture.detectChanges();
    expect(component.valueChange.emit).toHaveBeenCalledWith('New Value');
  });

  it('should set textarea attributes correctly', () => {
    component.name = 'test-name';
    component.id = 'test-id';
    fixture.detectChanges();
    expect(textAreaElement.nativeElement.name).toBe('test-name');
    expect(textAreaElement.nativeElement.id).toBe('test-id');
  });
});
