import { TestBed } from '@angular/core/testing';

import { MerchantsResolverService } from './merchants-resolver.service';

describe('MerchantsResolverService', () => {
  let service: MerchantsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
