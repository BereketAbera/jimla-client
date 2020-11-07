import { TestBed } from '@angular/core/testing';

import { CategoryListService } from './category-list.service';

describe('CategoryListService', () => {
  let service: CategoryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
