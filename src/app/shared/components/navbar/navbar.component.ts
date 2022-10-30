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

  ngOnInit() {
    this.items = [
      {
        label: 'Taryfikator',
        items: [
          {
            label: 'Dodaj',
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
            icon: 'pi pi-fw pi-dollar'
          },
          {
            label: 'Wykup abonament',
            icon: 'pi pi-fw pi-credit-card'
          },
          {
            label: 'Historia opłat',
            icon: 'pi pi-fw pi-history'
          },
        ]
      },
      {
        label: 'Kary',
        items: [
          {
            label: 'Historia kar',
            icon: 'pi pi-fw pi-exclamation-triangle',
          },
        ]
      }
    ];

    this.rightItems = [{
      label: 'Opcje',
      items: [
        {
          label: 'Profil'
        },
        {
          label: 'Wyloguj'
        }
      ]
    }]
  }

}
