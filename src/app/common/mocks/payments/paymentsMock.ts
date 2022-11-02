import {Payment} from "../../models/payment";
import {PaymentMethods} from "../../models/paymentMethod";

export const PaymentsMock: Payment[] = [
  {
    id: 1,
    date: new Date(2022,8,10,12,30),
    paymentMethod: PaymentMethods[0]
  },
  {
    id: 2,
    date: new Date(2022,6,22,17,40),
    paymentMethod: PaymentMethods[1]
  }
]
