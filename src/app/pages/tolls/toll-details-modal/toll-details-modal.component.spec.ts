import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TollDetailsModalComponent } from './toll-details-modal.component';

describe('TollDetailsModalComponent', () => {
  let component: TollDetailsModalComponent;
  let fixture: ComponentFixture<TollDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TollDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TollDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
