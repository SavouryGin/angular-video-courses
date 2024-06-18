import { TestBed } from '@angular/core/testing';
import { BreadcrumbsModule } from './breadcrumbs.module';

describe('BreadcrumbsModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsModule],
    }).compileComponents();
  });

  it('should create the module', () => {
    expect(BreadcrumbsModule).toBeDefined();
  });
});
