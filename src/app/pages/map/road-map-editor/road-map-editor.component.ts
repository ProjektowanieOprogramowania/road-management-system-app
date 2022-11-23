import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Road, RoadNode, RoadSegment, RoadsService} from "../../../services/generated";
import {
  getFitBounds,
  positionToLocalization,
  segmentsToGoogleMarkersArr,
  segmentsToGooglePolylineArr,
  segmentToPolyline
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
export class RoadMapEditorComponent implements OnInit, AfterViewInit {

  roadForm: FormGroup;

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

  isRoadEdit: boolean = false;
  roadEditId: string = '';
  loadedRoad?: Road;
  isRoadLoading = false;
  //loadedMarkers: any = [];

  subscription = new Subscription();

  @ViewChild('gMap') gMap: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private roadsService: RoadsService,
              private messageService: MessageService) {
    const roadId = this.route.snapshot.queryParamMap.get('roadId');

    if (roadId !== null) {
      this.isRoadEdit = true;
      this.roadEditId = roadId;
      this.isRoadLoading = true;
    }

    this.roadForm = this.fb.group({
      name: ['', Validators.required],
      subscriptionPriceForOneDay: [ null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.mapOptions = {
      center: new google.maps.LatLng(52.237049, 21.017532),
      zoom: 6.3
    }
    this.infoWindow = new google.maps.InfoWindow();
  }

  ngAfterViewInit(): void {
    this.loadRoadToEdit();
  }

  private loadRoadToEdit() {
    this.subscription.add(
      this.roadsService.getRoad(Number(this.roadEditId)).subscribe(
        {
          next: value => {
            this.loadedRoad = value;
            this.isRoadLoading = false;
            this.roadForm.get('name')?.setValue(this.loadedRoad.name);
            this.roadForm.get('subscriptionPriceForOneDay')?.setValue(this.loadedRoad.subscriptionPriceForOneDay);
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

    this.mapOverlays.push(...markers);
    this.mapOverlays.push(...lines);
    this.gMap.getMap().fitBounds(getFitBounds(markers));

    //this.loadedMarkers = markers;
    // this.mapOptions = {
    //   restrictions: {
    //     latLngBounds: getFitBounds(markers),
    //     strictBounds: false,
    //   }
    // }
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

  handleOverlayDrag(event: any) {
    this.onNodePositionChange(event);
  }

  handleOverlayDragEnd(event: any) {
   this.onNodePositionChange(event);
  }

  onNodePositionChange(event: any){
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      let position = event.overlay.getPosition();

      let nodeId = this.roadNodes.findIndex(x => x.name === title);
      if (nodeId !== -1) {
        this.roadNodes[nodeId].localization = positionToLocalization(position);

        this.roadSegments = this.roadSegments.map(x => {
            if (x.startNode.name === title) {
              x.startNode.localization = positionToLocalization(position);
            } else if (x.endNode.name === title) {
              x.endNode.localization = positionToLocalization(position);
            }
            return x;
          }
        );

        this.mapOverlays = this.mapOverlays.filter(x => x.getTitle != undefined);
        this.mapOverlays.push(...segmentsToGooglePolylineArr(this.roadSegments));
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
