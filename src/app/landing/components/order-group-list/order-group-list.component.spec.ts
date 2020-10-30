import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGroupListComponent } from './order-group-list.component';

describe('OrderGroupListComponent', () => {
  let component: OrderGroupListComponent;
  let fixture: ComponentFixture<OrderGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
