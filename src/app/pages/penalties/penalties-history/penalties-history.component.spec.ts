import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltiesHistoryComponent } from './penalties-history.component';

describe('PenaltiesHistoryComponent', () => {
  let component: PenaltiesHistoryComponent;
  let fixture: ComponentFixture<PenaltiesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltiesHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenaltiesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
