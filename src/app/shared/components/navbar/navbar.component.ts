import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  rightItems: MenuItem[] = [];

  displayProfileSelectionModal = false;

  ngOnInit() {
    this.items = [
      {
        label: 'Taryfikator',
        items: [
          {
            label: 'Dodaj',
            routerLink: ['/tariffs/create'],
            icon: 'pi pi-fw pi-plus',
          },
          {
            label: 'Wyświetl listę',
            routerLink: ['/tariffs'],
            icon: 'pi pi-fw pi-list'
          },
        ]
      },
      {
        label: 'Finanse',
        items: [
          {
            label: 'Opłać przejazd',
            routerLink: ['/charges/notPaidPassingCharges'],
            icon: 'pi pi-fw pi-dollar'
          },
          {
            label: 'Wykup abonament',
            routerLink: ['/subscriptions/subscribe'],
            icon: 'pi pi-fw pi-credit-card'
          },
          {
            label: 'Historia opłat',
            routerLink: ['/charges'],
            icon: 'pi pi-fw pi-history'
          },
        ]
      },
      {
        label: 'Kary',
        items: [
          {
            label: 'Historia kar',
            routerLink: ['/penalties'],
            icon: 'pi pi-fw pi-exclamation-triangle',
          },
        ]
      }
    ];

    this.rightItems = [{
      label: 'Opcje',
      items: [
        {
          label: 'Profil',
        },
        {
          label: 'UUID',
          command: event => this.onProfileClick()
        },
        {
          label: 'Wyloguj'
        }
      ]
    }]
  }

  onProfileClick(){
    this.showProfileModal();
  }

  showProfileModal(){
    this.displayProfileSelectionModal = true;
  }

  onProfileModalHide(){
    this.displayProfileSelectionModal = false;
  }

}
