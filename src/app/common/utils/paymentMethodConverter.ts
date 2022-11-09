import {PaymentMethod} from "../../services/generated";
import {PaymentMethodModel} from "../models/paymentMethod";


export const PaymentConvertedModel = () => {

  const newModel: PaymentMethodModel[] = [
    {name: 'Blik', value: PaymentMethod.Blik},
    {name: 'Przelew pocztowy', value: PaymentMethod.PostalOrder},
    {name: 'Przelew bankowy', value: PaymentMethod.BankTransfer}
  ];

  return newModel;
}
