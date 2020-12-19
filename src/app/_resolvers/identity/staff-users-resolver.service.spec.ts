import { TestBed } from '@angular/core/testing';

import { StaffUsersResolverService } from './staff-users-resolver.service';

describe('StaffUsersResolverService', () => {
  let service: StaffUsersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffUsersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
