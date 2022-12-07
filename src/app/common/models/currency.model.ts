import {Currency} from "../../services/generated";

export interface CurrencyModel {
  code: string,
  value: Currency,
  sign: string
}

export const CurrencyModels: CurrencyModel[] =  [
  {
    code: 'PLN',
    value: Currency.Pln,
    sign: 'zł'
  },
  {
    code: 'USD',
    value: Currency.Usd,
    sign: '$'
  },
  {
    code: 'EUR',
    value: Currency.Eur,
    sign: '€'
  },
];

export const convertToModel = (currency: Currency) => {
  return CurrencyModels.find(c => c.value == currency);
}
