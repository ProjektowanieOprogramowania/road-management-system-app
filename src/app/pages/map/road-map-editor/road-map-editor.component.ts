import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Road, RoadNode, RoadSegment, RoadsService, TariffSimplified, TariffsService} from "../../../services/generated";
import {
  getFitBounds,
  positionToLocalization,
  segmentsToGoogleMarkersArr,
  segmentsToGooglePolylineArr,
  segmentsToRoadNodes,
  segmentToPolyline
} from "../../../common/utils/mapLocalization";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {SegmentMarker} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

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
  segmentToEdit?: RoadSegment;

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

  tariffs: TariffSimplified[] = [{name: "Brak taryfikatora - przejazd darmowy", active: false}]
  selectedTariff?: TariffSimplified;

  nodeEditing = new Set<string>();
  nodeNameControl = '';
  nodeNameErrors = '';

  segmentNodeSelect = new Set<string>();
  segmentNodeControl?: RoadNode;
  segmentNodeErrors = '';

  selectedEditTariff?: TariffSimplified;

  subscription = new Subscription();

  @ViewChild('gMap') gMap: any;

  constructor(private fb: FormBuilder,
              private router: Router,
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

    this.loadTariffs();
  }

  ngAfterViewInit(): void {
    if (this.isRoadEdit) {
      this.loadRoadToEdit();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  private loadTariffs() {
    this.subscription.add(
      this.tariffsService.getAllTariffs().subscribe({
        next: data => {
          this.tariffs.push(...data.filter(t => t.active));
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
  }

  onSubmit(el: HTMLElement) {
    this.roadForm.markAllAsTouched()

    if (this.roadForm.invalid) {
      this.scroll(el);
      return;
    }

    const road: Road = {
      name: this.name?.value,
      subscriptionPriceForOneDay: this.subscriptionPriceForOneDay?.value,
      segments: this.roadSegments
    }

    if (!this.roadEditId) {
      this.onAddRoad(road);
    } else {
      this.onUpdateRoad(road);
    }
  }

  onAddRoad(road: Road) {
    this.subscription.add(
      this.roadsService.addRoad(road).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Pomyślnie dodano nową drogę!'});
          setTimeout(() => {
            this.router.navigate(['/map/roadMap']);
          }, 750)
        }
      }));
  }

  onUpdateRoad(road: Road) {
    this.subscription.add(
      this.roadsService.updateRoad(parseInt(this.roadEditId), road).subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Pomyślnie zaktualizowano drogę!'});
          setTimeout(() => {
            this.router.navigate(['/map/roadMap']);
          }, 750)
        }
      }));
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
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

    if (this.selectedTariff?.id) {
      this.subscription.add(
        this.tariffsService.getTariff(this.selectedTariff.id).subscribe({
          next: data => {
            const segment: RoadSegment = {
              // id: Math.floor(Math.random() * 10000000), //forList ahtung error
              startNode: this.startSegmentNode!,
              endNode: this.endSegmentNode!,
              tariff: data
            };
            this.submitSegment(segment);
          }
        }));
    } else {
      const segment: RoadSegment = {
        // id: Math.floor(Math.random() * 10000000), //forList error
        startNode: this.startSegmentNode,
        endNode: this.endSegmentNode,
      };
      this.submitSegment(segment);
    }
  }

  submitSegment(segment: RoadSegment) {
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

  onEditNode(name: string) {
    if (this.nodeEditing.size > 0) {
      this.nodeEditing.clear();
    }

    this.nodeNameControl = name;
    this.nodeEditing.add(name);
  }

  onOkNode(name: string) {
    if (this.nodeNameControl.length === 0) {
      this.nodeNameErrors = 'Nie może byc puste!'
      this.messageService.add({severity: 'error', summary: this.nodeNameErrors});
      return;
    }

    if (this.roadNodes.findIndex(node => node.name == this.nodeNameControl && node.name != name) !== -1) {
      this.nodeNameErrors = 'Taka nazwa już istnieje!'
      this.messageService.add({severity: 'error', summary: this.nodeNameErrors});
      return;
    }

    this.roadNodes.find(node => node.name === name)!.name = this.nodeNameControl;
    this.nodeEditing.clear();
    this.mapOverlays = this.mapOverlays.map(elem => {
      if (elem.title && elem.title === name) {
        elem.title = this.nodeNameControl;
      }
      return elem;
    });

    this.roadSegments = this.roadSegments.map(x => {
        if (x.startNode.name === name) {
          x.startNode.name = this.nodeNameControl
        } else if (x.endNode.name === name) {
          x.endNode.name = this.nodeNameControl
        }
        return x;
      }
    );

    this.mapOverlays = this.mapOverlays.filter(x => x.getTitle != undefined);
    this.mapOverlays.push(...segmentsToGooglePolylineArr(this.roadSegments));
  }

  onDeleteNode(name: string) {
    this.roadNodes = this.roadNodes.filter(node => node.name !== name);
    this.roadSegments = this.roadSegments.filter(seg => seg.endNode.name !== name && seg.startNode.name !== name);

    this.mapOverlays = this.mapOverlays.filter(x => x.title && x.title != name);
    console.log(this.mapOverlays)
    this.mapOverlays.push(...segmentsToGooglePolylineArr(this.roadSegments));
    console.log(this.mapOverlays)

    // this.deleteNodeFromOverlay(name);
  }

  private deleteNodeFromOverlay(name: string) {
    let newOverlays: any = [];

    this.mapOverlays.forEach(elem => {
      if (elem.title && elem.title != name) {
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
          draggable: true
        });
      })
    );

    newOverlays.push(segmentsToGooglePolylineArr(this.roadSegments));
    this.mapOverlays = newOverlays;
  }

  onDeleteSegment(id: number) {
    //nie usuwa sie z mapki :c

    this.roadSegments = this.roadSegments.filter(segment => segment.id !== id);
    this.overlayRefresh();
  }

  onEditSegment(segment: RoadSegment) {
    console.log(segment)
    this.segmentToEdit = segment;
    this.selectedEditTariff = segment.tariff;
    console.log(this.selectedEditTariff)
  }

  turnOffEditingSegment() {
    this.segmentToEdit = undefined;
    this.selectedEditTariff = undefined;
  }

  editSegment() {
    if (this.selectedEditTariff?.id && this.selectedEditTariff.id !== this.segmentToEdit?.tariff?.id) {
      this.subscription.add(
        this.tariffsService.getTariff(this.selectedEditTariff.id).subscribe({
          next: data => {
            const segment: RoadSegment = {
              ...this.segmentToEdit,
              startNode: this.segmentToEdit!.startNode,
              endNode: this.segmentToEdit!.endNode,
              tariff: data
            };
            this.submitEditSegment(segment);
          }
        }));
    } else {
      const segment: RoadSegment = {
        ...this.segmentToEdit,
        startNode: this.segmentToEdit!.startNode,
        endNode: this.segmentToEdit!.endNode,
      };
      this.submitEditSegment(segment);
    }
  }

  private submitEditSegment(segment: RoadSegment) {
    console.log(segment)

    const id = this.roadSegments.findIndex(x => x.startNode.name === this.segmentToEdit?.startNode.name
      && x.endNode.name === this.segmentToEdit.endNode.name);

    this.roadSegments[id].tariff = segment.tariff;

    const removed = this.roadSegments.splice(id);

    this.roadSegments = [...this.roadSegments, removed[0]];

    this.messageService.add({severity: 'success', summary: 'Pomyślnie zaktualizowano odcinek!'});

    this.turnOffEditingSegment();
  }

  onSegmentNodeEdit(node: RoadNode){
    if(this.segmentNodeSelect.size > 0){
      this.segmentNodeSelect.clear();
    }

    this.segmentNodeSelect.add(node.name);
    this.segmentNodeControl = node;
  }

  onSegmentOkEdit(nodeType: 'start' | 'end'){
    this.segmentNodeSelect.clear();

    if(nodeType === 'start'){
      if(this.segmentToEdit!.endNode.name == this.segmentNodeControl?.name){
        this.messageService.add({severity: 'error', summary: 'Nie mozna zmienic odcinka na istniejący!'});
        return;
      }
      this.segmentToEdit!.startNode = this.segmentNodeControl!;
    }
    else {
      if(this.segmentToEdit!.startNode.name == this.segmentNodeControl?.name){
        this.messageService.add({severity: 'error', summary: 'Nie mozna zmienic odcinka na istniejący!'});
        return;
      }
      this.segmentToEdit!.endNode = this.segmentNodeControl!;
    }
  }
}
