import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoComponent } from './logo.component';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent, MockTranslatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Video Course" logo', () => {
    const logoElement = fixture.debugElement.query(
      By.css('.logo')
    ).nativeElement;
    expect(logoElement.textContent).toContain('mainHeader');
  });
});
