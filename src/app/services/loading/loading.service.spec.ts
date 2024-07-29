import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with loading state as false', () => {
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
    });
  });

  it('should set loading state to true on show()', () => {
    service.show();
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
    });
  });

  it('should set loading state to false on hide()', () => {
    service.show(); // Ensure it is true first
    service.hide();
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBeFalse();
    });
  });
});
