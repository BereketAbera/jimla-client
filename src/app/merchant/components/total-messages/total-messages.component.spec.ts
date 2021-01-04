import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMessagesComponent } from './total-messages.component';

describe('TotalMessagesComponent', () => {
  let component: TotalMessagesComponent;
  let fixture: ComponentFixture<TotalMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
