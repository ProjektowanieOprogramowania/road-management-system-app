import {PassingCharge} from "../../services/generated";
import {PassingChargeModel} from "../models/passingCharge.model";

export const ToPassingChargeModel = (passingCharge: PassingCharge, order: number): PassingChargeModel => {
  return {
    ...passingCharge,
    vehicleName: `${passingCharge.passing.vehicle.make} ${passingCharge.passing.vehicle.registrationNumber}`,
    issueDate: new Date(
      Number(passingCharge.passing.dateTime[0]),
      Number(passingCharge.passing.dateTime[1]),
      Number(passingCharge.passing.dateTime[2]),
      Number(passingCharge.passing.dateTime[3]),
      Number(passingCharge.passing.dateTime[4]),
      Number(passingCharge.passing.dateTime[5])),
    orderNumber: order
  }
}
