import {Localization} from "./localization";
import {Vehicle} from "./vehicle";

export interface Passing {
  id?: number;
  payable: boolean;
  dateTime: Date;
  localization: Localization;
  vehicle: Vehicle;
}
