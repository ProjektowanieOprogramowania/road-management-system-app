import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-road-map-editor',
  templateUrl: './road-map-editor.component.html',
  styleUrls: ['./road-map-editor.component.scss']
})
export class RoadMapEditorComponent implements OnInit {

  roadForm = this.fb.group({
    name: ['', Validators.required],
    subscriptionPriceForOneDay: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.roadForm.markAllAsTouched()
  }

  get name() {
    return this.roadForm.get('name');
  }

  get subscriptionPriceForOneDay() {
    return this.roadForm.get('subscriptionPriceForOneDay');
  }
}
