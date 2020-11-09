import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySmallComponent } from './company-small.component';

describe('CompanySmallComponent', () => {
  let component: CompanySmallComponent;
  let fixture: ComponentFixture<CompanySmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySmallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
