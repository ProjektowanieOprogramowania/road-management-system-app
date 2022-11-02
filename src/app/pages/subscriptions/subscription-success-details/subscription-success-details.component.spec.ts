import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSuccessDetailsComponent } from './subscription-success-details.component';

describe('SubscriptionSuccessDetailsComponent', () => {
  let component: SubscriptionSuccessDetailsComponent;
  let fixture: ComponentFixture<SubscriptionSuccessDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionSuccessDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionSuccessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
