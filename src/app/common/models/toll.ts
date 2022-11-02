import {Charge} from "./charge";
import {Ride} from "./ride";
import {Driver} from "./driver";
import {TableRow} from "./tableRow";

export interface Toll extends Charge, TableRow {
  driver: Driver
  ride: Ride
}
