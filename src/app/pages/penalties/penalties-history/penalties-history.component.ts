import { Component, OnInit } from '@angular/core';
import {PenaltiesService} from "../../../services/penalties.service";
import {PenaltyModel} from "../../../common/models/penalty.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-penalties-history',
  templateUrl: './penalties-history.component.html',
  styleUrls: ['./penalties-history.component.scss']
})
export class PenaltiesHistoryComponent implements OnInit {

  subscription = new Subscription();

  penalties: PenaltyModel[] = [];
  penaltiesPayed: number[] = [];

  constructor(private penaltiesService: PenaltiesService ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.penaltiesService.getPenaltiesHistory()
        .subscribe(e => {
          this.penalties = e;
          this.penaltiesPayed = this.penalties.map( p => p.id);
        })
    )
  }

}
