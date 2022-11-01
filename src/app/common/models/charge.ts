import {Payment} from "./payment";

export interface Charge {
  id: number,
  amount: number,
  payment: Payment | null
}
