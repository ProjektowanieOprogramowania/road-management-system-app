import {Charge} from "../../services/generated";
import {ChargeModel} from "../models/charge.model";
import {dateFromArray} from "./dateFromArray";

export const ToChargeModel = (charge: Charge, order: number): ChargeModel => {
  return {
    ...charge,
    paymentDate: charge.payment ? dateFromArray(charge.payment.dateTime) : undefined,
    orderNumber: order
  }
}
