import {Payment} from "./payment";

export interface Charge {
  id?: number;
  amount: number;
  paid: boolean;
  payment?: Payment;
}
