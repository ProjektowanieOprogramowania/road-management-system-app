import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTariffComponent } from './edit-tariff.component';

describe('EditTariffComponent', () => {
  let component: EditTariffComponent;
  let fixture: ComponentFixture<EditTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTariffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
