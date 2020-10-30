import { TestBed } from '@angular/core/testing';

import { GetOrderResolverService } from './get-order-resolver.service';

describe('GetOrderResolverService', () => {
  let service: GetOrderResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrderResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
