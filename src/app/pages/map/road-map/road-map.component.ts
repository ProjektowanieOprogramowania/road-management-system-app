import {Component, OnInit} from '@angular/core';
import {Road, RoadsService} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {
  getFitBounds,
  segmentsToGoogleMarkersArr,
  segmentsToGooglePolylineArr
} from "../../../common/utils/mapLocalization";

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

  subscription = new Subscription();

  constructor(private roadsService: RoadsService,
              private messageService: MessageService) {
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
    this.mapOverlays = [];
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
    console.log(this.selectedRoad);
    console.log('load road!')
    if(this.selectedRoad){
      this.setOverlays(this.selectedRoad, map);
    }
  }

  simpleMock: Road = {
    id: 1,
    name: 'Autostrada',
    subscriptionPriceForOneDay: 123,
    segments: [
      {
        id: 1,
        price: 12,
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
        price: 12,
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
        price: 12,
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
        price: 12,
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
