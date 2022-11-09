import {Charge} from "../../models/charge";
import {PaymentsMock} from "../payments/paymentsMock";

export const ChargesMock: Charge[] = [
  {
    id: 1,
    amount: 100,
    paid: true,
    payment: PaymentsMock.find(x => x.id === 1)
  },
  {
    id: 2,
    amount: 50,
    paid: true,
    payment: PaymentsMock.find(x => x.id === 2)
  },
  {
    id: 3,
    amount: 20,
    paid: false,
    payment: PaymentsMock.find(x => x.id === 3)
  },
]
