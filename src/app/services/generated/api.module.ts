import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AuctionOfferService } from './api/auctionOffer.service';
import { AuctionsService } from './api/auctions.service';
import { CameraStreamService } from './api/cameraStream.service';
import { ChargesService } from './api/charges.service';
import { PassingChargesService } from './api/passingCharges.service';
import { PenaltiesService } from './api/penalties.service';
import { RoadNodesService } from './api/roadNodes.service';
import { RoadSegmentsService } from './api/roadSegments.service';
import { RoadsService } from './api/roads.service';
import { SensorsService } from './api/sensors.service';
import { SubscriptionsService } from './api/subscriptions.service';
import { TariffsService } from './api/tariffs.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
