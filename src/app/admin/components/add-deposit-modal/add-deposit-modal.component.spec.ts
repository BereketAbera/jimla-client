import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepositModalComponent } from './add-deposit-modal.component';

describe('AddDepositModalComponent', () => {
  let component: AddDepositModalComponent;
  let fixture: ComponentFixture<AddDepositModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepositModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepositModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
