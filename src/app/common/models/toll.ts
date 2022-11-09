import {Charge} from "./charge";
import {Passing} from "./passing";
import {TableRow} from "./tableRow";

export interface Toll extends TableRow {
  id?: number;
  passing: Passing;
  charge: Charge;
}
