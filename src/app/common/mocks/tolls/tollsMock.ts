import {Toll} from "../../models/toll";
import {DriversMock} from "../drivers/driversMock";
import {RidesMock} from "../rides/ridesMock";

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
    ride: RidesMock.find(x => x.id === 1)!
  },
  {
    id: 3,
    amount: 150,
    payment: null,
    driver: DriversMock.find(x => x.id === 1)!,
    ride: RidesMock.find(x => x.id === 1)!
  }
]
