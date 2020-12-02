import { TestBed } from '@angular/core/testing';

import { AddressResolverService } from './address-resolver.service';

describe('AddressResolverService', () => {
  let service: AddressResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
