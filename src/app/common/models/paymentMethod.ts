export interface PaymentMethod {
  id: number,
  name: string,
  icon?: string,
  url?: string
}

export const PaymentMethods: PaymentMethod[] = [
  {
    id: 1,
    name: "Blik"
  },
  {
    id: 2,
    name: "Przelew"
  },
  {
    id: 3,
    name: "PayU"
  }
]
