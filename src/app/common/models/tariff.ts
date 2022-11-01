export interface Tariff {
  id: number,
  active: boolean,
  name: string,
  prices: {[key: string]: number}
}
