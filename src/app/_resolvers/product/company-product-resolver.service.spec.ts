import { TestBed } from '@angular/core/testing';

import { CompanyProductResolverService } from './company-product-resolver.service';

describe('CompanyProductResolverService', () => {
  let service: CompanyProductResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyProductResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
