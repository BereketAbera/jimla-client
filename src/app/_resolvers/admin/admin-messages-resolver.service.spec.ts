import { TestBed } from '@angular/core/testing';

import { AdminMessagesResolverService } from './admin-messages-resolver.service';

describe('AdminMessagesResolverService', () => {
  let service: AdminMessagesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMessagesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
