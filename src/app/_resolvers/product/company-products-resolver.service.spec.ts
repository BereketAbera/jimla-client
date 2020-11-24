import { TestBed } from '@angular/core/testing';

import { CompanyProductsResolverService } from './company-products-resolver.service';

describe('CompanyProductsResolverService', () => {
  let service: CompanyProductsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyProductsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
