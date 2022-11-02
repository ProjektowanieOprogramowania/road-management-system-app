import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPaidTollsComponent } from './not-paid-tolls.component';

describe('NotPaidTollsComponent', () => {
  let component: NotPaidTollsComponent;
  let fixture: ComponentFixture<NotPaidTollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotPaidTollsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotPaidTollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
