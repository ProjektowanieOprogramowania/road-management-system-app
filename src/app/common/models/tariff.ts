export interface Tariff {
  id: number,
  active: boolean,
  name: string,
  prices: Map<string, number>
}
