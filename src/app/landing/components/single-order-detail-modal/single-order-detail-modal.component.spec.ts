import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOrderDetailModalComponent } from './single-order-detail-modal.component';

describe('SingleOrderDetailModalComponent', () => {
  let component: SingleOrderDetailModalComponent;
  let fixture: ComponentFixture<SingleOrderDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleOrderDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOrderDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
