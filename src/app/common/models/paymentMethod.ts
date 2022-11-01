export interface PaymentMethod {
  name: string,
  icon?: string,
  url?: string
}

export const PaymentMethods: PaymentMethod[] = [
  {
    name: "Blik"
  },
  {
    name: "Przelew"
  },
  {
    name: "PayU"
  }
]
