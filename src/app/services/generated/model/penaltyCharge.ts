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
import { Passing } from './passing';
import { Charge } from './charge';


export interface PenaltyCharge { 
    id?: number;
    description?: string;
    passing: Passing;
    charge: Charge;
    paid: boolean;
}

