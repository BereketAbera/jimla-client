import { TestBed } from '@angular/core/testing';

import { RetailerDashboardResolverService } from './retailer-dashboard-resolver.service';

describe('RetailerDashboardResolverService', () => {
  let service: RetailerDashboardResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetailerDashboardResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
