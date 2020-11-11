import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSmallImageComponent } from './product-small-image.component';

describe('ProductSmallImageComponent', () => {
  let component: ProductSmallImageComponent;
  let fixture: ComponentFixture<ProductSmallImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSmallImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSmallImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
