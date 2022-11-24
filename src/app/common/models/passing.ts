import {Vehicle} from "./vehicle";
import {Localization} from "../../services/generated";

export interface Passing {
  id?: number;
  payable: boolean;
  dateTime: Date;
  localization: Localization;
  vehicle: Vehicle;
}
