import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar.component';
import { ButtonComponent } from '../button/button.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent, ButtonComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call console.log with the entered value when the Search button is clicked', () => {
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    const searchButtonDebugElement = fixture.debugElement.query(
      By.css('.toolbar_search-button')
    );
    const searchButtonNativeElement =
      searchButtonDebugElement.nativeElement.querySelector('button');
    const testValue = 'Angular';

    spyOn(console, 'log');
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    searchButtonNativeElement.click();
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(
      'Search button clicked',
      testValue
    );
  });

  it('should call console.log with the entered value when Enter key is pressed', () => {
    const inputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    const testValue = 'React';

    spyOn(console, 'log');
    inputElement.value = testValue;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(
      'Search button clicked',
      testValue
    );
  });

  it('should call console.log when the Add Course button is clicked', () => {
    const addButtonDebugElement = fixture.debugElement.query(
      By.css('.toolbar_add-button')
    );
    const addButtonNativeElement =
      addButtonDebugElement.nativeElement.querySelector('button');

    spyOn(console, 'log');

    addButtonNativeElement.click();
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith('Add Course button clicked');
  });
});
