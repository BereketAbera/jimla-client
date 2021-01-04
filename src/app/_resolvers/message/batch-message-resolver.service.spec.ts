import { TestBed } from '@angular/core/testing';

import { BatchMessageResolverService } from './batch-message-resolver.service';

describe('BatchMessageResolverService', () => {
  let service: BatchMessageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchMessageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
