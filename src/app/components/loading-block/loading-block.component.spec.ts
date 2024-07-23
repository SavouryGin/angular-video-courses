import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { LoadingBlockComponent } from './loading-block.component';
import { LoadingService } from '../../services/loading/loading.service';

class MockLoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}

describe('LoadingBlockComponent', () => {
  let component: LoadingBlockComponent;
  let fixture: ComponentFixture<LoadingBlockComponent>;
  let loadingService: MockLoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingBlockComponent],
      providers: [{ provide: LoadingService, useClass: MockLoadingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingBlockComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(
      LoadingService
    ) as unknown as MockLoadingService;
    fixture.detectChanges();
  });

  it('should show the spinner when loadingService.isLoading is true', () => {
    loadingService.show();
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    const overlay = fixture.debugElement.query(By.css('.loading-overlay'));

    expect(spinner).toBeTruthy();
    expect(overlay).toBeTruthy();
  });

  it('should hide the spinner when loadingService.isLoading is false', () => {
    loadingService.hide();
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.spinner'));
    const overlay = fixture.debugElement.query(By.css('.loading-overlay'));

    expect(spinner).toBeFalsy();
    expect(overlay).toBeFalsy();
  });
});
