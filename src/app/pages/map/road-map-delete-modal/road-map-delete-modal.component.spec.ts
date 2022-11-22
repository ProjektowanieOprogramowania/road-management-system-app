import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapDeleteModalComponent } from './road-map-delete-modal.component';

describe('RoadMapDeleteModalComponent', () => {
  let component: RoadMapDeleteModalComponent;
  let fixture: ComponentFixture<RoadMapDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadMapDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadMapDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
