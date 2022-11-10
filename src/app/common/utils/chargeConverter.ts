import {Charge} from "../../services/generated";
import {ChargeModel, ChargeTypeModels} from "../models/charge.model";
import {dateFromArray} from "./dateFromArray";

export const ToChargeModel = (charge: Charge, order: number): ChargeModel => {
  return {
    ...charge,
    paymentDate: charge.payment ? dateFromArray(charge.payment.dateTime) : undefined,
    chargeType: ChargeTypeModels.find(x => x.value === charge.chargeType)?.name,
    orderNumber: order
  }
}
