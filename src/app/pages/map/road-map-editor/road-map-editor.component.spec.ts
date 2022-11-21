import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapEditorComponent } from './road-map-editor.component';

describe('RoadMapEditorComponent', () => {
  let component: RoadMapEditorComponent;
  let fixture: ComponentFixture<RoadMapEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoadMapEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadMapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
