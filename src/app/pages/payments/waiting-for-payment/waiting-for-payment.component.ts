import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private subscriptionService: SubscriptionsService,
    private passingChargesService: PassingChargesService
  ) {
  }

  ngOnInit(): void {

    if (this.subscriptionModel !== undefined) {
      this.onPaySubscription();
    } else if (this.passingChargeId !== undefined) {
      this.onPayPassingCharge();
    } else {
      this.onBadInput();
    }
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

  onPayPassingChargeSuccess() {
    this.messageService.add({severity: 'success', summary: 'Płatność przebiegła pomyślnie!'})

    this.subscription.add(
      this.passingChargesService.payPassingCharge(this.passingChargeId!, this.paymentMethod!)
        .subscribe(data => {
          setTimeout(() => {
            this.router.navigate(['/charges']);
          }, 2500)
        })
    );
  }

  onPayPassingChargeFailure() {
    this.messageService.add({severity: 'error', summary: 'Płatność nie powiodła się!'});

    setTimeout(() => {
      this.router.navigate(['/charges/notPaidPassingCharges'], {
        queryParams: {
          passingChargeId: this.passingChargeId
        }
      });
      this.fail.emit();
      // window.location.href = window.location.origin + `/charges/notPaidPassingCharges?passingChargeId=${this.passingChargeId}`;
    }, 2500);
  }

  onPaySubscriptionFailure() {
    this.messageService.add({severity: 'error', summary: 'Płatność nie powiodła się!'});

    setTimeout(() => {
      this.router.navigate(['/subscriptions/subscribe'], {});
      window.location.reload();
    }, 2500);
  }

  onPaySubscriptionSuccess() {

    this.subscription.add(
      this.subscriptionService.buySubscription(this.paymentMethod!, this.subscriptionModel!)
        .subscribe({
          next: value => {
            this.messageService.add({severity: 'success', summary: 'Płatność przebiegła pomyślnie!'});
            setTimeout(() => {
              this.router.navigate(['/subscriptions/payed']);
            }, 3000);
          },
          error: err => {
            this.messageService.add({severity: 'error', summary: err});
            console.log('err');
          }
        }));
  }

  onBadInput() {
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
