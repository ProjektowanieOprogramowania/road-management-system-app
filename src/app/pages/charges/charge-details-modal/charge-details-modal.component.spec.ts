import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeDetailsModalComponent } from './charge-details-modal.component';

describe('TollDetailsModalComponent', () => {
  let component: ChargeDetailsModalComponent;
  let fixture: ComponentFixture<ChargeDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargeDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
