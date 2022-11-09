import {PaymentMethod} from "./paymentMethod";

export interface Payment {
  id?: number;
  amount: number;
  date: Date,
  paymentMethod: PaymentMethod
}