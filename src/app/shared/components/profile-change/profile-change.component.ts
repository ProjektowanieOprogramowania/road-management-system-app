import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserProfileService} from "../../../services/user-profile.service";

@Component({
  selector: 'app-profile-change',
  templateUrl: './profile-change.component.html',
  styleUrls: ['./profile-change.component.scss']
})
export class ProfileChangeComponent implements OnInit {


  @Input() display = false;

  @Output() hide = new EventEmitter();

  userId = '';

  changeResult = false;

  constructor(private userService: UserProfileService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
  }

  onHide() {
    this.hide.emit();
  }

  onOk() {
    this.hide.emit();
  }

  onChangeId() {
    const res = this.userService.setUserId(this.userId);

    if(res === this.userId){
      this.changeResult = true;
    }
    this.userId = res;
  }
}
