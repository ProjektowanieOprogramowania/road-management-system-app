import {LocalizationsMock} from "../locations/localizationsMock";
import {VehiclesMock} from "../vehicles/vehiclesMock";
import {Passing} from "../../../services/generated";

export const PassingsMock: Passing[] = [
  {
    id: 1,
    payable: true,
    dateTime: '',
    localization: LocalizationsMock.find(x => x.id === 1)!,
    vehicle: VehiclesMock.find(x => x.id ===1)!
  },
  {
    id: 2,
    payable: true,
    dateTime: '',
    localization: LocalizationsMock.find(x => x.id === 1)!,
    vehicle: VehiclesMock.find(x => x.id ===1)!
  },
  {
    id: 3,
    payable: true,
    dateTime: '',
    localization: LocalizationsMock.find(x => x.id === 1)!,
    vehicle: VehiclesMock.find(x => x.id ===1)!
  }
]
