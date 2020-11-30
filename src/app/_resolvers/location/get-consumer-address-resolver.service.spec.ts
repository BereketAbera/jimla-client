import { TestBed } from '@angular/core/testing';

import { GetConsumerAddressResolverService } from './get-consumer-address-resolver.service';

describe('GetConsumerAddressResolverService', () => {
  let service: GetConsumerAddressResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetConsumerAddressResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
