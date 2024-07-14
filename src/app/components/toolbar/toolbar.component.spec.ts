import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent, ButtonComponent],
      imports: [FormsModule],
      providers: [{ provide: Router, useValue: routerMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search query when search button is clicked', () => {
    spyOn(component.search, 'emit');
    component.searchQuery = 'Test Search';
    fixture.detectChanges();

    const searchButton = fixture.debugElement.query(
      By.css('.toolbar_search-button')
    );
    searchButton.triggerEventHandler('onClick', null);

    expect(component.search.emit).toHaveBeenCalledWith('Test Search');
  });

  it('should emit search query when enter key is pressed in the input', () => {
    spyOn(component.search, 'emit');
    component.searchQuery = 'Test Search';
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('.toolbar_input'));
    input.triggerEventHandler('keydown.enter', new Event('keydown'));

    expect(component.search.emit).toHaveBeenCalledWith('Test Search');
  });

  it('should navigate to add course page when add course button is clicked', () => {
    const addCourseButton = fixture.debugElement.query(
      By.css('.toolbar_add-button')
    );
    addCourseButton.triggerEventHandler('onClick', null);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/courses/new']);
  });

  it('should bind input value to searchQuery property', async () => {
    const input = fixture.nativeElement.querySelector('.toolbar_input');
    input.value = 'Test Search';
    input.dispatchEvent(new Event('input'));

    await fixture.whenStable();

    expect(component.searchQuery).toBe('Test Search');
  });
});
