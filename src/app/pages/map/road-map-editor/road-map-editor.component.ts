import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Road, RoadNode, RoadSegment, RoadsService, Tariff, TariffsService} from "../../../services/generated";
import {
  getFitBounds,
  positionToLocalization,
  segmentsToGoogleMarkersArr,
  segmentsToGooglePolylineArr, segmentsToRoadNodes,
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

  selectedNode?: RoadNode;
  selectedSegment?: RoadSegment;

  mapOptions: any;
  mapOverlays: any[] = [];
  infoWindow: any;

  addNodePopupOpen: boolean = false;

  nodeInfoOpen: boolean = false;

  isAddingNodesModeOn: boolean = false;
  isAddingSegmentsModeOn: boolean = false;

  nodeName: string = '';
  nodeNameError?: string;
  selectedPosition: any;

  startSegmentNode?: RoadNode
  endSegmentNode?: RoadNode

  isRoadEdit: boolean = false;
  roadEditId: string = '';
  loadedRoad?: Road;
  isRoadLoading = false;
  //loadedMarkers: any = [];

  nodeEditing = new Set<string>();
  nodeNameControl = '';
  nodeNameErrors = '';

  tariffs: Tariff[] = [];

  subscription = new Subscription();

  @ViewChild('gMap') gMap: any;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private roadsService: RoadsService,
              private tariffsService: TariffsService,
              private messageService: MessageService) {
    const roadId = this.route.snapshot.queryParamMap.get('roadId');

    if (roadId !== null) {
      this.isRoadEdit = true;
      this.roadEditId = roadId;
      this.isRoadLoading = true;
    }

    this.roadForm = this.fb.group({
      name: ['', Validators.required],
      subscriptionPriceForOneDay: [null, [Validators.required, Validators.min(0)]]
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
    if (this.isRoadEdit) {
      this.loadRoadToEdit();
    }
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
    if (!this.loadedRoad || !this.loadedRoad.segments) {
      return;
    }

    const markers = segmentsToGoogleMarkersArr(this.loadedRoad.segments, {draggable: true});
    const lines = segmentsToGooglePolylineArr(this.loadedRoad.segments);

    this.roadNodes = segmentsToRoadNodes(this.loadedRoad.segments);
    this.roadSegments = this.loadedRoad.segments;

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
          if (this.startSegmentNode.name === title) {
            this.messageService.add({
              severity: 'error',
              summary: 'Węzeł końcowy nie może być taki sam jak początkowy!'
            });
            return;
          }
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

  onNodePositionChange(event: any) {
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
    this.nodeNameError = '';

    if (!this.nodeName) {
      this.nodeNameError = "Nazwa jest wymagana.";
      return;
    }

    this.roadNodes.every(x => {
      if (x.name === this.nodeName) {
        this.nodeNameError = "Węzeł o takiej nazwie już istnieje."
        return false;
      }
      return true;
    });

    if (this.nodeNameError) {
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

    this.roadNodes = [...this.roadNodes, {
      name: this.nodeName!,
      localization: {
        latitude: this.selectedPosition.lat(),
        longitude: this.selectedPosition.lng()
      }
    }];

    this.nodeName = '';
    this.addNodePopupOpen = false;
    this.closeNodeInfo();

    this.messageService.add({severity: 'success', summary: 'Pomyślnie dodano nowy węzeł!'});
  }

  addSegment() {
    if (!this.startSegmentNode || !this.endSegmentNode) {
      return;
    }

    let exists = false;
    this.roadSegments.every(x => {
      if ((x.startNode.name === this.startSegmentNode!.name && x.endNode.name === this.endSegmentNode!.name)
        || (x.startNode.name === this.endSegmentNode!.name && x.endNode.name === this.startSegmentNode!.name)) {
        this.messageService.add({severity: 'error', summary: 'Odcinek o takich węzłach już istnieje!'});
        exists = true;
        return false;
      }
      return true;
    });

    if (exists) {
      this.startSegmentNode = undefined;
      this.endSegmentNode = undefined;
      return;
    }

    const segment: RoadSegment = {
      id: Math.floor(Math.random()*10000000), //forList
      startNode: this.startSegmentNode,
      endNode: this.endSegmentNode
    };

    this.roadSegments = [...this.roadSegments, segment];

    this.mapOverlays.push(
      segmentToPolyline(segment)
    );

    this.startSegmentNode = undefined;
    this.endSegmentNode = undefined;

    this.messageService.add({severity: 'success', summary: 'Pomyślnie dodano nowy odcinek!'});
  }

  closeNodeInfo() {
    this.infoWindow.close();
    this.nodeInfoOpen = false;
  }

  onAddNodePopupHide() {
    this.nodeName = '';
    this.selectedPosition = undefined;
    this.nodeNameError = undefined;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  onEditNode(name: string){
    if(this.nodeEditing.size > 0){
      this.nodeEditing.clear();
    }

    this.nodeNameControl = name;
    this.nodeEditing.add(name);
  }

  onOkNode(name: string){
    if(this.nodeNameControl.length === 0){
      this.nodeNameErrors = 'Nie może byc puste!'
      this.messageService.add({severity: 'error', summary: this.nodeNameErrors});
      return;
    }

    if(this.roadNodes.findIndex(node => node.name == this.nodeNameControl && node.name != name) !== -1){
      this.nodeNameErrors = 'Taka nazwa już istnieje!'
      this.messageService.add({severity: 'error', summary: this.nodeNameErrors});
      return;
    }

    this.roadNodes.find(node => node.name === name)!.name = this.nodeNameControl;
    this.nodeEditing.clear();
    this.mapOverlays = this.mapOverlays.map(elem => {
      if(elem.title){
        elem.title = this.nodeNameControl;
      }
      return elem;
    });
  }

  onDeleteNode(name: string) {
    this.roadNodes = this.roadNodes.filter(node => node.name !== name);
    this.roadSegments = this.roadSegments.filter(seg => seg.endNode.name !== name && seg.startNode.name !== name);
    this.deleteNodeFromOverlay(name);
  }

  private deleteNodeFromOverlay(name: string){
    let newOverlays: any = [];

    this.mapOverlays.forEach(elem => {
      if(elem.title && elem.title != name){
        newOverlays.push(elem);
      }
    });

    this.mapOverlays = newOverlays;
  }

  onCancelEditNode() {
    this.nodeEditing.clear();
  }

  overlayRefresh() {
    //nie wiem czy to dobrze działa...
    const newOverlays: any = [];

    newOverlays.push(
      ...this.roadNodes.map(node => {
        return new google.maps.Marker({
          position: {
            lat: node.localization.latitude,
            lng: node.localization.longitude
          },
          title: node.name,
          draggable: true});
      })
    );

    newOverlays.push(segmentsToGooglePolylineArr(this.roadSegments));
    this.mapOverlays = newOverlays;
  }

  onDeleteSegment(id: number) {
    //nie usuwa sie z mapki :c

    this.roadSegments = this.roadSegments.filter(segment => segment.id !== id);
    //this.overlayRefresh();
  }
}
