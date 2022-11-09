import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesHistoryComponent } from './charges-history.component';

describe('TollsHistoryComponent', () => {
  let component: ChargesHistoryComponent;
  let fixture: ComponentFixture<ChargesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
