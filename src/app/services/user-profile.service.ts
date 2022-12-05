import {Injectable} from '@angular/core';
import {Role} from "../common/models/role.model";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  profileId = "PROFILE_ID";
  private role = "ROLE";

  constructor() {
  }

  public getUserId(): string {
    const userId = localStorage.getItem(this.profileId);
    if (userId === null) {
      return '4d312962-5bbf-11ed-9b6a-0242ac120002';
    }
    return userId;
  }

  public setUserId(id: string): string {
    if (id === '') {
      id = '4d312962-5bbf-11ed-9b6a-0242ac120002';
    }
    localStorage.setItem(this.profileId, `${id}`);
    return this.getUserId();
  }

  public getUserRole() {
    const role = localStorage.getItem(this.role);
    return role && Object.values(Role).includes(role as Role) ? role as Role : Role.User;
  }

  public setUserRole(role: Role) {
    localStorage.setItem(this.role, role);
  }
}
