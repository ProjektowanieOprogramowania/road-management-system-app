import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  profileId = "PROFILE_ID";

  constructor() { }

  public getUserId(): string{
    const userId = localStorage.getItem(this.profileId);
    if(userId === null){
      return '4d312962-5bbf-11ed-9b6a-0242ac120002';
    }
    return userId;
  }

  public setUserId(id: string): string{
    if(id === ''){
      id = '4d312962-5bbf-11ed-9b6a-0242ac120002';
    }
    localStorage.setItem(this.profileId, `${id}`);
    return this.getUserId();
  }

}
