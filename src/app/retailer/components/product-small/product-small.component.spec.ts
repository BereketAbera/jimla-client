import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSmallComponent } from './product-small.component';

describe('ProductSmallComponent', () => {
  let component: ProductSmallComponent;
  let fixture: ComponentFixture<ProductSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
