import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserProfileService} from "../../../services/user-profile.service";
import {Role} from "../../../common/models/role.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  items: MenuItem[] = [];
  rightItems: MenuItem[] = [];

  displayProfileSelectionModal = false;

  userRole!: Role;

  username: string = '';

  constructor(private userService: UserProfileService) {
  }

  ngOnInit() {
    this.userRole = this.userService.getUserRole();
    this.username = this.userRole === Role.User ? 'Jan Kowalski' : 'Pracownik';

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
            label: 'Posiadane abonamenty',
            routerLink: ['/subscriptions/payed'],
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
      },
      {
        label: 'Mapy',
        items: [
          {
            label: 'Mapa dróg - edycja',
            routerLink: ['/map/roadMap'],
            queryParams: {'edit': true},
            icon: 'pi pi-fw pi-map',
          },
          {
            label: 'Mapa dróg',
            routerLink: ['/map/roadMap'],
            icon: 'pi pi-fw pi-map',
          },
          {
            label: 'Dodaj drogę',
            routerLink: ['/map/roadMapEditor'],
            icon: 'pi pi-fw pi-plus',
          },
        ]
      },
      {
        label: 'Czujniki',
        items: [
          {
            label: 'Zarejestruj czujnik',
            routerLink: ['/sensor/register'],
            icon: 'pi pi-fw pi-plus',
          },
        ]
      },
      {
        label: 'Monitoring',
        items: [
          {
            label: 'Wyświetl obraz z kamery',
            routerLink: ['/cameras/view-camera'],
            icon: 'pi pi-fw pi-camera',
          }
        ]
      },
      {
        label: 'Przetargi',
        items: [
          {
            label: 'Wyświetl listę',
            routerLink: ['/auctions'],
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Dodaj',
            routerLink: ['/auctions/modify'],
            icon: 'pi pi-fw pi-plus',
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
          command: () => this.onProfileClick()
        },
        {
          label: this.userRole === Role.User ? 'Pracownik' : 'Jan Kowalski',
          command: () => this.onProfileChange(),
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

  onProfileChange() {
    const roleToSwitch = this.userRole === Role.User ? Role.Worker : Role.User;
    this.userService.setUserRole(roleToSwitch);
    this.userRole = this.userService.getUserRole();
    this.username = this.userRole === Role.User ? 'Jan Kowalski' : 'Pracownik';
    this.rightItems[0].items![2].label = this.userRole === Role.User ? 'Pracownik' : 'Jan Kowalski';
  }
}
