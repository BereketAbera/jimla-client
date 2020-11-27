import { TestBed } from '@angular/core/testing';

import { BroadcastErrorService } from './broadcast-error.service';

describe('BroadcastErrorService', () => {
  let service: BroadcastErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BroadcastErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
