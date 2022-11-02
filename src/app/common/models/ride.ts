import {Location} from "./location";

export interface Ride {
  id: number,
  isPayed: boolean,
  date: Date,
  location: Location
}
