import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAddressesModalComponent } from './merchant-addresses-modal.component';

describe('MerchantAddressesModalComponent', () => {
  let component: MerchantAddressesModalComponent;
  let fixture: ComponentFixture<MerchantAddressesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAddressesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAddressesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
