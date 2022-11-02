import {User} from "./user";
import {Charge} from "./charge";

export interface Driver extends User {
  charges: Charge[]
}
