import {PaymentMethod} from "../../services/generated";

export interface PaymentMethodModel {
  name: string,
  value: PaymentMethod
}

export const PaymentMethodModels: PaymentMethodModel[] = [
  {name: 'Blik', value: PaymentMethod.Blik},
  {name: 'Przelew pocztowy', value: PaymentMethod.PostalOrder},
  {name: 'Przelew bankowy', value: PaymentMethod.BankTransfer}
];
