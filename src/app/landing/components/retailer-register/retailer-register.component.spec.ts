import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRegisterComponent } from './retailer-register.component';

describe('RetailerRegisterComponent', () => {
  let component: RetailerRegisterComponent;
  let fixture: ComponentFixture<RetailerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
