import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TollsHistoryComponent } from './tolls-history.component';

describe('TollsHistoryComponent', () => {
  let component: TollsHistoryComponent;
  let fixture: ComponentFixture<TollsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TollsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TollsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
