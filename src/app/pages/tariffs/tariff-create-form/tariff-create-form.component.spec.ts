import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffCreateFormComponent } from './tariff-create-form.component';

describe('TariffCreateFormComponent', () => {
  let component: TariffCreateFormComponent;
  let fixture: ComponentFixture<TariffCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffCreateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
