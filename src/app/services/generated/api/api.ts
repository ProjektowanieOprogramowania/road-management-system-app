export * from './charges.service';
import { ChargesService } from './charges.service';
export * from './passingCharges.service';
import { PassingChargesService } from './passingCharges.service';
export * from './penalties.service';
import { PenaltiesService } from './penalties.service';
export * from './roads.service';
import { RoadsService } from './roads.service';
export * from './subscriptions.service';
import { SubscriptionsService } from './subscriptions.service';
export * from './tariffs.service';
import { TariffsService } from './tariffs.service';
export const APIS = [ChargesService, PassingChargesService, PenaltiesService, RoadsService, SubscriptionsService, TariffsService];
