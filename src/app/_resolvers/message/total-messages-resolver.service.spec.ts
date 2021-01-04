import { TestBed } from '@angular/core/testing';

import { TotalMessagesResolverService } from './total-messages-resolver.service';

describe('TotalMessagesResolverService', () => {
  let service: TotalMessagesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalMessagesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
