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
      return 'none';
    }
    return userId;
  }

  public setUserId(id: string): string{
    localStorage.setItem(this.profileId, `${id}`);
    return this.getUserId();
  }

}
