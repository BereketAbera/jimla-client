import { TestBed } from '@angular/core/testing';

import { GetConsumerCategoriesResolverService } from './get-consumer-categories-resolver.service';

describe('GetConsumerCategoriesResolverService', () => {
  let service: GetConsumerCategoriesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetConsumerCategoriesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
