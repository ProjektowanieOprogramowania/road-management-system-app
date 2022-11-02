import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTollModalComponent } from './pay-toll-modal.component';

describe('PayTollModalComponent', () => {
  let component: PayTollModalComponent;
  let fixture: ComponentFixture<PayTollModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayTollModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayTollModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
