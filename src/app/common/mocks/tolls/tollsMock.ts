import {Toll} from "../../models/toll";
import {DriversMock} from "../drivers/driversMock";
import {RidesMock} from "../rides/ridesMock";
import {PaymentsMock} from "../payments/paymentsMock";

export const TollsMock: Toll[] = [
  {
    id: 1,
    amount: 100,
    payment: null,
    driver: DriversMock.find(x => x.id === 1)!,
    ride: RidesMock.find(x => x.id === 1)!
  },
  {
    id: 2,
    amount: 200,
    payment: null,
    driver: DriversMock.find(x => x.id === 1)!,
    ride: RidesMock.find(x => x.id === 2)!
  },
  {
    id: 3,
    amount: 50,
    payment: null,
    driver: DriversMock.find(x => x.id === 1)!,
    ride: RidesMock.find(x => x.id === 3)!
  },
  {
    id: 4,
    amount: 20,
    payment: PaymentsMock.find(x => x.id === 1)!,
    driver: DriversMock.find(x => x.id === 1)!,
    ride: RidesMock.find(x => x.id === 1)!
  },
  {
    id: 5,
    amount: 70,
    payment: PaymentsMock.find(x => x.id === 2)!,
    driver: DriversMock.find(x => x.id === 1)!,
    ride: RidesMock.find(x => x.id === 1)!
  }
]
