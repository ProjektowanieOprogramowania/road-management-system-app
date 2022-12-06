import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapViewerComponent } from './road-map-viewer.component';

describe('RoadMapViewerComponent', () => {
  let component: RoadMapViewerComponent;
  let fixture: ComponentFixture<RoadMapViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadMapViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadMapViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
