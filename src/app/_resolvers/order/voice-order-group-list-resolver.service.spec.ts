import { TestBed } from '@angular/core/testing';

import { VoiceOrderGroupListResolverService } from './voice-order-group-list-resolver.service';

describe('VoiceOrderGroupListResolverService', () => {
  let service: VoiceOrderGroupListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceOrderGroupListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
