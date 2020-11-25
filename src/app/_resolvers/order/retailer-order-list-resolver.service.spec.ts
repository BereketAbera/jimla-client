import { TestBed } from '@angular/core/testing';

import { RetailerOrderListResolverService } from './retailer-order-list-resolver.service';

describe('RetailerOrderListResolverService', () => {
  let service: RetailerOrderListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailerOrderListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
