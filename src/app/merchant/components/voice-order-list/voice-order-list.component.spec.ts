import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceOrderListComponent } from './voice-order-list.component';

describe('VoiceOrderListComponent', () => {
  let component: VoiceOrderListComponent;
  let fixture: ComponentFixture<VoiceOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoiceOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
