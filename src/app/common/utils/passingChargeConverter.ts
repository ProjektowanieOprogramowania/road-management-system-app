import {PassingCharge} from "../../services/generated";
import {PassingChargeModel} from "../models/passingCharge.model";
import {dateFromArray} from "./dateFromArray";

export const ToPassingChargeModel = (passingCharge: PassingCharge, order: number): PassingChargeModel => {
  return {
    ...passingCharge,
    vehicleName: `${passingCharge.passing.vehicle.make} ${passingCharge.passing.vehicle.registrationNumber}`,
    issueDate: dateFromArray(passingCharge.passing.dateTime),
    orderNumber: order
  }
}
