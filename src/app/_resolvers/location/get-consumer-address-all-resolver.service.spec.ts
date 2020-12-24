import { TestBed } from '@angular/core/testing';

import { GetConsumerAddressAllResolverService } from './get-consumer-address-all-resolver.service';

describe('GetConsumerAddressAllResolverService', () => {
  let service: GetConsumerAddressAllResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetConsumerAddressAllResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
