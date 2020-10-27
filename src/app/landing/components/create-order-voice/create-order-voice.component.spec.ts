import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderVoiceComponent } from './create-order-voice.component';

describe('CreateOrderVoiceComponent', () => {
  let component: CreateOrderVoiceComponent;
  let fixture: ComponentFixture<CreateOrderVoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderVoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
