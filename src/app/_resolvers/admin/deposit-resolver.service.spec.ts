import { TestBed } from '@angular/core/testing';

import { DepositResolverService } from './deposit-resolver.service';

describe('DepositResolverService', () => {
  let service: DepositResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
