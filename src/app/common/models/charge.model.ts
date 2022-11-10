import {Charge, ChargeType} from "../../services/generated";
import {TableRow} from "./tableRow";

export interface ChargeModel extends Charge, TableRow {
  paymentDate?: Date
}

export interface ChargeTypeModel {
  value: ChargeType,
  name: string
}

export const ChargeTypeModels: ChargeTypeModel[] = [
  {value: ChargeType.PassingCharge, name: 'Passing Charge'},
  {value: ChargeType.PenaltyCharge, name: 'Penalty Charge'},
  {value: ChargeType.SubscriptionCharge, name: 'Subscription Charge'}
]
