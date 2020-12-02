import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOrderListComponent } from './active-order-list.component';

describe('ActiveOrderListComponent', () => {
  let component: ActiveOrderListComponent;
  let fixture: ComponentFixture<ActiveOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
