import {Currency} from "../../services/generated";

export interface CurrencyModel {
  code: string,
  value: Currency,
  factorToPln: number
}

export const CurrencyModels: CurrencyModel[] =  [
  {
    code: 'PLN',
    value: Currency.Pln,
    factorToPln: 1
  },
  {
    code: 'USD',
    value: Currency.Usd,
    factorToPln: 4.49
  },
  {
    code: 'EUR',
    value: Currency.Pln,
    factorToPln: 4.69
  },
];
