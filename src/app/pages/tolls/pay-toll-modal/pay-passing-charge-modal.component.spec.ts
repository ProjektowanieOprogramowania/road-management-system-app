import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPassingChargeModalComponent } from './pay-passing-charge-modal.component';

describe('PayTollModalComponent', () => {
  let component: PayPassingChargeModalComponent;
  let fixture: ComponentFixture<PayPassingChargeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayPassingChargeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayPassingChargeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
