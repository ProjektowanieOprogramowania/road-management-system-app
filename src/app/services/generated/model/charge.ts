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
import { Payment } from './payment';


export interface Charge { 
    id?: number;
    userId: string;
    description?: string;
    chargeType?: string;
    amount: number;
    paid: boolean;
    payment?: Payment;
}

