import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {PassingChargesMock} from "../../../common/mocks/tolls/passingChargesMock";
import {PaymentMethods} from "../../../common/models/paymentMethod";

@Component({
  selector: 'app-waiting-for-payment',
  templateUrl: './waiting-for-payment.component.html',
  styleUrls: ['./waiting-for-payment.component.scss'],
  providers: [MessageService],
})
export class WaitingForPaymentComponent implements OnInit {

  chargeId: string | null | undefined;
  paymentMethodId: string | null | undefined;

  navigateWhenSuccess = '';
  navigateWhenFailure = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.chargeId = this.route.snapshot.queryParamMap.get('chargeId');
    this.paymentMethodId = this.route.snapshot.queryParamMap.get('methodId');

    const navWhenFailure = this.route.snapshot.paramMap.get('whenFailure');
    const navWhenSuccess = this.route.snapshot.paramMap.get('whenSuccess');
    this.navigateWhenFailure =  navWhenFailure ? navWhenFailure : '';
    this.navigateWhenSuccess = navWhenSuccess ? navWhenSuccess : '';

    setTimeout(() => {
      //przelew spejclanie nie bedzie dzialac
      if (this.paymentMethodId !== '2') {
        this.onSuccess();
      } else {
        this.onFailure();
      }
    }, 2000)
  }

  onSuccess() {
    this.messageService.add({severity: 'success', summary: 'Płatność przebiegła pomyślnie!'});

    // PassingChargesMock.find(x => x.id === Number.parseInt(this.chargeId!))!.payment = {
    //   id: Number.parseInt(this.chargeId!),
    //   paymentMethod: PaymentMethods.find(x => x.id === Number.parseInt(this.paymentMethodId!))!,
    //   date: new Date(2022, 2, 2)
    // }

    setTimeout(() => {
      this.router.navigate([this.navigateWhenSuccess]);
    }, 3000)
  }

  onFailure() {
    this.messageService.add({severity: 'error', summary: 'Płatność nie powiodła się!'});

    setTimeout(() => {
      this.router.navigate([this.navigateWhenFailure], {
        queryParams: {
          chargeId: this.chargeId,
        }
      });
    }, 2500)
  }
}
