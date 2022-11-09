import {Charge} from "../../services/generated";
import {ChargeModel} from "../models/charge.model";

export const ToChargeModel = (charge: Charge, order: number): ChargeModel => {
  return {
    ...charge,
    paymentDate: charge.payment ? new Date(
        Number(charge.payment.dateTime[0]),
        Number(charge.payment.dateTime[1]),
        Number(charge.payment.dateTime[2]),
        Number(charge.payment.dateTime[3]),
        Number(charge.payment.dateTime[4]),
        Number(charge.payment.dateTime[5]))
      : undefined,
    orderNumber: order
  }
}
