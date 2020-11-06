import { TestBed } from '@angular/core/testing';

import { OrderListResolverService } from './order-list-resolver.service';

describe('OrderListResolverService', () => {
  let service: OrderListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
