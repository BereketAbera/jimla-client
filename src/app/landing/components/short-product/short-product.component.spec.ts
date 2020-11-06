import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortProductComponent } from './short-product.component';

describe('ShortProductComponent', () => {
  let component: ShortProductComponent;
  let fixture: ComponentFixture<ShortProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
