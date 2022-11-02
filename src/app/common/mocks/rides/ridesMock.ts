import {Ride} from "../../models/ride";
import {LocationsMock} from "../locations/locationsMock";

export const RidesMock: Ride[] = [
  {
    id: 1,
    isPayed: true,
    date: new Date(2022, 2, 3, 13, 20),
    location: LocationsMock.find(x => x.id === 1)!
  },
  {
    id: 2,
    isPayed: true,
    date: new Date(2022, 4, 3, 14, 20),
    location: LocationsMock.find(x => x.id === 1)!
  },
  {
    id: 3,
    isPayed: true,
    date: new Date(2022, 8, 3, 4, 20),
    location: LocationsMock.find(x => x.id === 1)!
  }
]
