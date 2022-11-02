export interface AvailableSubscriptionModel {
  id: number,
  name: string,
  price: number //per day ??
}

export interface SubscriptionOrderModel{
  startDate: Date,
  endDate: Date,
  price: number,
  selectedSubscriptionId: number,
  orderUrl: string,
}
