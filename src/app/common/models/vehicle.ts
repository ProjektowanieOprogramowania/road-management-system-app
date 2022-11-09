export interface Vehicle {
  id?: number;
  ownerUserId?: string;
  vehicleType: string;
  make: string;
  model?: string;
  productionYear?: number;
  registrationNumber?: string;
  /**
   * Length in meters
   */
  length?: number;
  /**
   * Width in meters
   */
  width?: number;
  /**
   * Height in meters
   */
  height?: number;
  /**
   * Weight in kilograms
   */
  weight?: number;
  engineVolumeCm3?: number;
}
