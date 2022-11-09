import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPaidPassingChargesComponent } from './not-paid-passing-charges.component';

describe('NotPaidTollsComponent', () => {
  let component: NotPaidPassingChargesComponent;
  let fixture: ComponentFixture<NotPaidPassingChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotPaidPassingChargesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotPaidPassingChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
