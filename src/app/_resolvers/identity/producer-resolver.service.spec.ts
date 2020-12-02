import { TestBed } from '@angular/core/testing';

import { ProducerResolverService } from './producer-resolver.service';

describe('ProducerResolverService', () => {
  let service: ProducerResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducerResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
