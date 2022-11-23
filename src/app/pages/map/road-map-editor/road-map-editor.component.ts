import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Road, RoadNode, RoadSegment, RoadsService} from "../../../services/generated";
import {
  getFitBounds,
  roadNodeParsed,
  segmentsToGoogleMarkersArr,
  segmentsToGooglePolylineArr
} from "../../../common/utils/mapLocalization";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-road-map-editor',
  templateUrl: './road-map-editor.component.html',
  styleUrls: ['./road-map-editor.component.scss'],
  providers: [MessageService]
})
export class RoadMapEditorComponent implements OnInit {

  roadForm: FormGroup;

  roadSegments: RoadSegment[] = [];

  mapOptions: any;
  mapOverlays: any[] = [];

  addNodePopupOpen: boolean = false;

  nodeInfoOpen: boolean = false;

  isAddingNodesModeOn: boolean = false;
  isAddingSegmentsModeOn: boolean = false;

  nodeName: string | null = null;

  selectedPosition: any;

  infoWindow: any;

  startSegmentNode?: RoadNode
  endSegmentNode?: RoadNode

  isRoadEdit: boolean = false;
  roadEditId: string = '';
  loadedRoad?: Road;
  isRoadLoading = false;

  subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private roadsService: RoadsService,
              private messageService: MessageService) {
    const roadId = this.route.snapshot.queryParamMap.get('roadId');

    if (roadId !== null) {
      this.isRoadEdit = true;
      this.roadEditId = roadId;
      this.isRoadLoading = true;
      this.loadRoadToEdit();
    }

    this.roadForm = this.fb.group({
      name: [this.isRoadEdit ? this.loadedRoad?.name! : '', Validators.required],
      subscriptionPriceForOneDay: [this.isRoadEdit ? this.loadedRoad?.subscriptionPriceForOneDay! : null,
        [Validators.required, Validators.min(0)]]
    });
  }

  private loadRoadToEdit() {
    this.subscription.add(
      this.roadsService.getRoad(Number(this.roadEditId)).subscribe(
        {
          next: value => {
            this.loadedRoad = value;
            this.isRoadLoading = false;
            this.addLoadedMarkersAndLines();
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Road edit loading error'});
          }
        }));
  }

  private addLoadedMarkersAndLines() {
    const markers = segmentsToGoogleMarkersArr(this.loadedRoad?.segments!, {});
    const lines = segmentsToGooglePolylineArr(this.loadedRoad?.segments!, {
      color: '#FFF000',
      opacity: 0.8,
      weight: 2
    });

    this.mapOverlays.push(markers);
    this.mapOverlays.push(lines);

    this.mapOptions = {
      restrictions: {
        latLngBounds: getFitBounds(markers),
        strictBounds: false,
      }
    }

  }

  ngOnInit(): void {

    if (!this.isRoadEdit) {
      this.mapOptions = {
        center: new google.maps.LatLng(52.237049, 21.017532),
        zoom: 6.3
      }
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
      if (this.isAddingSegmentsModeOn) this.turnOffAddingSegmentsMode();
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

    this.turnOffAddingSegmentsMode()
  }

  turnOffAddingSegmentsMode() {
    this.isAddingSegmentsModeOn = false;
    this.startSegmentNode = undefined;
    this.endSegmentNode = undefined;
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
      let position = event.overlay.getPosition();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      this.nodeInfoOpen = true;

      if (this.isAddingSegmentsModeOn) {
        if (!this.startSegmentNode) {
          this.startSegmentNode = {
            name: title,
            localization: {
              latitude: position.lat(),
              longitude: position.lng()
            }
          };
        } else if (this.startSegmentNode && !this.endSegmentNode) {
          this.endSegmentNode = {
            name: title,
            localization: {
              latitude: position.lat(),
              longitude: position.lng()
            }
          };
        }
      }
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

  addSegment() {
    const start = roadNodeParsed(this.startSegmentNode!);
    const end = roadNodeParsed(this.endSegmentNode!);

    this.mapOverlays.push(
      new google.maps.Polyline({
        path: [{
          lat: start.lat,
          lng: start.lng
        }, {lat: end.lat, lng: end.lng}],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2
      })
    );

    this.startSegmentNode = undefined;
    this.endSegmentNode = undefined;
  }

  closeNodeInfo() {
    this.infoWindow.close();
    this.nodeInfoOpen = false;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
