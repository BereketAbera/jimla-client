import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductModalComponent } from './edit-product-modal.component';

describe('EditProductModalComponent', () => {
  let component: EditProductModalComponent;
  let fixture: ComponentFixture<EditProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
