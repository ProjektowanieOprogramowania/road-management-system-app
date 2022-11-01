import {PaymentMethod} from "./paymentMethod";

export interface Payment {
  date: Date,
  paymentMethod: PaymentMethod
}
