import { TestBed } from '@angular/core/testing';

import { OrderGroupListResolverService } from './order-group-list-resolver.service';

describe('OrderGroupListResolverService', () => {
  let service: OrderGroupListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderGroupListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
