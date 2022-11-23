import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RoadNode, RoadSegment} from "../../../services/generated";
import {positionToLocalization, roadNodeParsed, segmentToPolyline} from "../../../common/utils/mapLocalization";

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

  roadSegments: RoadSegment[] = [];
  roadNodes: RoadNode[] = [];

  mapOptions: any;
  mapOverlays: any[] = [];
  infoWindow: any;

  addNodePopupOpen: boolean = false;
  nodeInfoOpen: boolean = false;

  isAddingNodesModeOn: boolean = false;
  isAddingSegmentsModeOn: boolean = false;

  nodeName: string = '';
  nodeNameError: boolean = false;
  selectedPosition: any;

  startSegmentNode?: RoadNode
  endSegmentNode?: RoadNode

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

  handleOverlayDragEnd(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      let position = event.overlay.getPosition();

      let nodeId = this.roadNodes.findIndex(x => x.name === title);
      if (nodeId !== -1) {
        this.roadNodes[nodeId].localization = positionToLocalization(position);

        this.roadSegments.map(x => {

          }
        );
      }
    }
  }

  addMarker() {
    if (!this.nodeName) {
      this.nodeNameError = true;
      return;
    }

    this.mapOverlays.push(new google.maps.Marker({
      position: {
        lat: this.selectedPosition.lat(),
        lng: this.selectedPosition.lng()
      },
      title: this.nodeName,
      draggable: true,
    }));

    this.roadNodes.push({
      name: this.nodeName!,
      localization: {
        latitude: this.selectedPosition.lat(),
        longitude: this.selectedPosition.lng()
      }
    });

    this.nodeName = '';
    this.addNodePopupOpen = false;
    this.closeNodeInfo();
  }

  addSegment() {
    if (!this.startSegmentNode || !this.endSegmentNode) {
      return;
    }

    const segment = {
      startNode: this.startSegmentNode,
      endNode: this.endSegmentNode
    };

    this.roadSegments.push(segment);

    this.mapOverlays.push(
      segmentToPolyline(segment)
    );

    this.startSegmentNode = undefined;
    this.endSegmentNode = undefined;
  }

  closeNodeInfo() {
    this.infoWindow.close();
    this.nodeInfoOpen = false;
  }

  onAddNodePopupHide() {
    this.nodeName = '';
    this.selectedPosition = undefined;
    this.nodeNameError = false;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
