export interface AvailableSubscriptionModel {
  id: number,
  name: string,
  price: number //per day ??
}

export interface SubscriptionOrderModel{
  id?: number;
  startDate: Date,
  endDate: Date,
  price: number,
  selectedSubscriptionIds: number[],
  orderUrl: string,
}

export interface SubscriptionSuccessModel{
  id: number,
  orderDate: Date,
  startDate: Date,
  endDate: Date,
  price: number,
  roadSubscriptions: AvailableSubscriptionModel[],
}
