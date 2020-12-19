import { TestBed } from '@angular/core/testing';

import { RetailersResolverService } from './retailers-resolver.service';

describe('RetailersResolverService', () => {
  let service: RetailersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
