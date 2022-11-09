import {Passing} from "../../models/passing";
import {LocalizationsMock} from "../locations/localizationsMock";
import {VehiclesMock} from "../vehicles/vehiclesMock";

export const PassingsMock: Passing[] = [
  {
    id: 1,
    payable: true,
    dateTime: new Date(2022, 2, 3, 13, 20),
    localization: LocalizationsMock.find(x => x.id === 1)!,
    vehicle: VehiclesMock.find(x => x.id ===1)!
  },
  {
    id: 2,
    payable: true,
    dateTime: new Date(2022, 4, 3, 14, 20),
    localization: LocalizationsMock.find(x => x.id === 1)!,
    vehicle: VehiclesMock.find(x => x.id ===1)!
  },
  {
    id: 3,
    payable: true,
    dateTime: new Date(2022, 8, 3, 4, 20),
    localization: LocalizationsMock.find(x => x.id === 1)!,
    vehicle: VehiclesMock.find(x => x.id ===1)!
  }
]
