import { Component, OnInit } from '@angular/core';
import {PenaltyModel} from "../../../common/models/penalty.model";
import {Subscription} from "rxjs";
import {PenaltiesService, PenaltyCharge} from "../../../services/generated";
import {UserProfileService} from "../../../services/user-profile.service";
import {MessageService} from "primeng/api";
import {dateFromArray} from "../../../common/utils/dateFromArray";

@Component({
  selector: 'app-penalties-history',
  templateUrl: './penalties-history.component.html',
  styleUrls: ['./penalties-history.component.scss'],
  providers: [MessageService]
})
export class PenaltiesHistoryComponent implements OnInit {

  subscription = new Subscription();

  penalties: PenaltyCharge[] = [];
  penaltiesPayed: number[] = [];

  uuid = '';
  constructor(private penaltiesService: PenaltiesService,
              private userService: UserProfileService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.uuid = this.userService.getUserId();
    this.subscription.add(
      this.penaltiesService.getAllPenalties(this.uuid).subscribe(
        {
          next: value => {
            this.penalties = this.changeDates(value);
          },
          error: err => {
            this.messageService.add({severity:'error', summary: 'Error', detail: err});
            console.error(err);
          }
        }
      )
    )
  }

  changeDates(penalties: PenaltyCharge[]): PenaltyCharge[]{
    let newPenalties: PenaltyCharge[] = [];
    penalties.forEach(value => {
      value.passing.dateTime = dateFromArray(value.passing.dateTime).toLocaleString();
      newPenalties.push(value);
    });
    return newPenalties;
  }
//2022,10,15,15,55,7
}
