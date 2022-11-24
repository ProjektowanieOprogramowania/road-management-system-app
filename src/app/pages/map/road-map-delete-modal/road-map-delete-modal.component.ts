import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Road, RoadsService} from "../../../services/generated";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-road-map-delete-modal',
  templateUrl: './road-map-delete-modal.component.html',
  styleUrls: ['./road-map-delete-modal.component.scss']
})
export class RoadMapDeleteModalComponent implements OnInit {

  @Input() roadData: Road | undefined;
  @Input() display = false;

  @Output() hide = new EventEmitter();
  @Output() deleteSuccessEvent = new EventEmitter<number>();

  isDeletingLoading = false;

  subscription = new Subscription();

  constructor(private roadService: RoadsService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onHide() {
    this.hide.emit();
  }

  onRoadDelete(){
    this.isDeletingLoading = true;

    this.subscription.add(
      //TODO zmienic na deleteRoads!
      this.roadService.deleteRoad(this.roadData?.id!)
        .subscribe(
          {
            next: value => {
              this.isDeletingLoading = false;
              this.deleteSuccessEvent.emit(this.roadData?.id);
            },
            error: err => {
              this.isDeletingLoading = false;
              this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'Delete error'});
              //this.deleteSuccessEvent.emit(this.roadData?.id);
            }}));
  }



}
