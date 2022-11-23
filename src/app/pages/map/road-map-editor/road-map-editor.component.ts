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

  mapOptions: any;
  mapOverlays: any[] = [];

  addNodePopupOpen: boolean = false;

  nodeInfoOpen: boolean = false;

  isAddingNodesModeOn: boolean = false;
  isAddingSegmentsModeOn: boolean = false;

  nodeName: string | null = null;

  selectedPosition: any;

  infoWindow: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.mapOptions = {
      center: new google.maps.LatLng(52.237049, 21.017532),
      zoom: 6.3
    }

    this.infoWindow = new google.maps.InfoWindow();
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

  switchAddingNodesMode() {
    if (!this.isAddingNodesModeOn) {
      this.isAddingNodesModeOn = true;
      this.isAddingSegmentsModeOn = false;
      return;
    }

    this.isAddingNodesModeOn = false;
  }

  switchAddingSegmentsMode() {
    if (!this.isAddingSegmentsModeOn) {
      this.isAddingSegmentsModeOn = true;
      this.isAddingNodesModeOn = false;
      return;
    }

    this.isAddingSegmentsModeOn = false;
  }

  handleMapClick(event: any) {
    if (!this.isAddingNodesModeOn) {
      return;
    }

    if (this.addNodePopupOpen) {
      this.addNodePopupOpen = false;
      return;
    }

    this.addNodePopupOpen = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      this.nodeInfoOpen = true;
    }
  }

  addMarker() {
    this.mapOverlays.push(new google.maps.Marker({
      position: {
        lat: this.selectedPosition.lat(),
        lng: this.selectedPosition.lng()
      },
      title: this.nodeName,
      draggable: true,
    }));
    this.nodeName = null;
    this.addNodePopupOpen = false;
    this.closeNodeInfo();
  }

  closeNodeInfo() {
    this.infoWindow.close();
    this.nodeInfoOpen = false;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
