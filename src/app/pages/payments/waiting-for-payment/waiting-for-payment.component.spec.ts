import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForPaymentComponent } from './waiting-for-payment.component';

describe('WaitingForPaymentComponent', () => {
  let component: WaitingForPaymentComponent;
  let fixture: ComponentFixture<WaitingForPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingForPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingForPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
