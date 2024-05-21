import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text', () => {
    const buttonText = 'Test Button';
    component.text = buttonText;
    fixture.detectChanges();

    const buttonElement: HTMLElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    expect(buttonElement.textContent).toBe(buttonText);
  });

  it('should emit onClick event when clicked', () => {
    spyOn(component.onClick, 'emit');

    const buttonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    buttonElement.click();

    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
