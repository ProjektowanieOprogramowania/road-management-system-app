import {Component, OnInit} from '@angular/core';
import {Road, RoadsService} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {
  getFitBounds,
  segmentsToGoogleMarkersArr,
  segmentsToGooglePolylineArr
} from "../../../common/utils/mapLocalization";
import {Router} from "@angular/router";

// declare var google: any; //new added line

@Component({
  selector: 'app-road-map',
  templateUrl: './road-map.component.html',
  styleUrls: ['./road-map.component.scss'],
  providers: [MessageService]
})
export class RoadMapComponent implements OnInit {

  roads: Road[] = [];
  selectedRoad?: Road;
  roadLoading = false;

  mapOptions: any;
  mapOverlays: any[] = [];
  infoWindow: any;

  displayRoadDeleteModal =  false;

  subscription = new Subscription();

  constructor(private roadsService: RoadsService,
              private messageService: MessageService,
              private router: Router) {

    this.roadLoading = true;
    this.subscription.add(this.roadsService.getAllRoads()
      .subscribe(
        {
          next: value => {
            this.roadLoading = false;
            this.roads = value;
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Failed to get roads'});
            this.roadLoading=false;
            this.roads.push(this.simpleMock);
            this.roads.push(this.simpleMock2);
          }
        }
      ));
  }

  private setOverlays(road: Road, map: any) {
    this.clearOverlays();
    const segments = road.segments;
    if (segments !== undefined) {
      const polylines = segmentsToGooglePolylineArr(segments, {
        weight: 3,
        opacity: 0.8,
        color: '#FF0011'
      });

      const markers = segmentsToGoogleMarkersArr(segments, {
      });

      this.mapOverlays.push(...polylines);
      this.mapOverlays.push(...markers);
      this.setBounds(markers, map);
    }

  }

  private clearOverlays(){
    this.mapOverlays = [];
  }

  private setBounds(markers: any[], map: any){
    map.fitBounds(getFitBounds(markers));
  }


  ngOnInit(): void {
    this.mapOptions = {
      center: new google.maps.LatLng(36.86251, 30.7442),
      zoom: 12
    }
    this.mapOverlays = []
    this.infoWindow = new google.maps.InfoWindow();
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if(isMarker){
      let title = event.overlay.getTitle();
      this.infoWindow.setContent(' ' + title + ' ');
      this.infoWindow.open(event.map, event.overlay);
      //event.map.setCenter(event.overlay.getPosition());
    }
  }

  onListChange(map: any) {
    if(this.selectedRoad){
      this.setOverlays(this.selectedRoad, map);
    }
  }


  onAddRoad() {
    this.router.navigate(['map/roadMapEditor']);
  }

  onEditRoad(id: number) {
    //TODO: b.kopysc dodaj edycje

    if(id !== undefined){
      alert(`edit road: ${id}`);
    }
  }

  onDeleteRoad(road: Road) {
    //TODO: b.kopysc dodaj usuwanie

    if(road !== undefined){
      this.selectedRoad = road;
      this.displayRoadDeleteModal = true;
    }
  }

  onDeleteRoadModalHide() {
    this.displayRoadDeleteModal = false;
  }

  onDeleteSuccess(id: number) {
    this.selectedRoad = undefined;
    this.clearOverlays();
    this.roads = this.roads.filter(road => road.id != id);
    this.onDeleteRoadModalHide();
    this.messageService.add({severity: 'success', summary: 'Sukces!', detail: 'Pomyślnie usunięto drogę'});
  }



  simpleMock: Road = {
    id: 1,
    name: 'Autostrada',
    subscriptionPriceForOneDay: 123,
    segments: [
      {
        id: 1,
        endNode: {
          id: 1,
          name: 'jeden',
          localization: {
            id: 1,
            latitude: '36.86149',
            longitude: '30.63743'
          }},
        startNode: {
          id: 2,
          name: 'dwa',
          localization: {
            id: 2,
            latitude: '36.86341',
            longitude: '30.72463'
          }}
      },
      {
        id: 1,
        endNode: {
          id: 1,
          name: 'jeden',
          localization: {
            id: 1,
            latitude: '36.86341',
            longitude: '30.72463'
          }},
        startNode: {
          id: 2,
          name: 'dwa',
          localization: {
            id: 2,
            latitude: '36.86241',
            longitude: '30.88663'
          }}
      }
    ]
  };

  simpleMock2: Road = {
    id: 2,
    name: 'Droga polna',
    subscriptionPriceForOneDay: 123,
    segments: [
      {
        id: 1,
        endNode: {
          id: 1,
          name: 'jeden',
          localization: {
            id: 1,
            latitude: '36.96149',
            longitude: '30.23743'
          }},
        startNode: {
          id: 2,
          name: 'dwa',
          localization: {
            id: 2,
            latitude: '36.96341',
            longitude: '30.32463'
          }}
      },
      {
        id: 1,
        endNode: {
          id: 1,
          name: 'jeden',
          localization: {
            id: 1,
            latitude: '36.96341',
            longitude: '30.32463'
          }},
        startNode: {
          id: 2,
          name: 'dwa',
          localization: {
            id: 2,
            latitude: '36.13241',
            longitude: '30.08663'
          }}
      }
    ]
  }
}
