/**
 * Read management system Frontend API
 * Read management system Frontend API
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { RoadSegment } from './roadSegment';


export interface Road { 
    id?: number;
    name: string;
    subscriptionPriceForOneDay: number;
    segments?: Array<RoadSegment>;
}

