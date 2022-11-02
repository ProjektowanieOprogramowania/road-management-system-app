import {PaymentMethod} from "./paymentMethod";

export interface Payment {
  id: number,
  date: Date,
  paymentMethod: PaymentMethod
}
