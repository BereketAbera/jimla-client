import { TestBed } from '@angular/core/testing';

import { ConsumerResolverService } from './consumer-resolver.service';

describe('ConsumerResolverService', () => {
  let service: ConsumerResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumerResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
