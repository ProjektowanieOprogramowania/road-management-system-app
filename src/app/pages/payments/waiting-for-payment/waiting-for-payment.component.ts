import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {TollsMock} from "../../../common/mocks/tolls/tollsMock";
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.chargeId = this.route.snapshot.queryParamMap.get('chargeId');
    this.paymentMethodId = this.route.snapshot.queryParamMap.get('methodId');

    setTimeout(() => {
      if (Math.random() > 0.5) {
        this.onSuccess();
      } else {
        this.onFailure();
      }
    }, 2000)
  }

  onSuccess() {
    this.messageService.add({severity: 'success', summary: 'Płatność przebiegła pomyślnie!'});

    TollsMock.find(x => x.id === Number.parseInt(this.chargeId!))!.payment = {
      id: Number.parseInt(this.chargeId!),
      paymentMethod: PaymentMethods.find(x => x.id === Number.parseInt(this.paymentMethodId!))!,
      date: new Date(2022, 2, 2)
    }

    setTimeout(() => {
      this.router.navigate(['/tolls/history']);
    }, 3000)
  }

  onFailure() {
    this.messageService.add({severity: 'error', summary: 'Płatność nie powiodła się!'});

    setTimeout(() => {
      this.router.navigate(['/tolls'], {
        queryParams: {
          chargeId: this.chargeId,
        }
      });
    }, 2500)
  }
}
