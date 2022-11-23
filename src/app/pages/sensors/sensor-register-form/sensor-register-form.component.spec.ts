import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorRegisterFormComponent } from './sensor-register-form.component';

describe('SensorRegisterFormComponent', () => {
  let component: SensorRegisterFormComponent;
  let fixture: ComponentFixture<SensorRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorRegisterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
