import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IFinancialData, IUserValidData } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../../core/services/auth.service';

interface INavbarOptions {
  text: string;
  path: string;
  active: boolean;
  show: boolean;
  textToValidate: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('navbarShowHide', [
      transition(':enter', [
        style({ height: '0px', paddingTop: '0rem' }),
        animate('500ms', style({ height: '91vh', paddingTop: '4rem' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ height: '0px', paddingTop: '0rem' })),
      ]),
    ]),
  ]
})
export class NavbarComponent implements OnInit {

  public userToken = sessionStorage.getItem('userToken');
  public userData?: IFinancialData | null;
  public showMenuNavbar = false;
  public NavbarOptions: INavbarOptions[] = [
    {
      text: 'Recaudos',
      textToValidate: 'Recaudo',
      path: '/receipts',
      active: false,
      show: false
    },

    {
      text: 'Historial',
      textToValidate: 'Historial',
      path: '/history',
      active: false,
      show: false
    },

    {
      text: 'Dispersión',
      textToValidate: 'Dispersion',
      path: '/dispersion',
      active: false,
      show: false
    }
  ];
  public menuIsCurrent = false;
  constructor( private router: Router, private authService: AuthService ){}

  ngOnInit(): void {
    if(!this.userToken) this.router.navigate(['/']);
    this.userData = this.authService.userData;
    this.detectNavigation();
  }

  detectNavigation() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.router.url;
      this.userData = this.authService.userData;
      this.changeCurrentRoute(currentRoute);
      this.changeMenuIsCurrent(currentRoute);
      this.detectAllowedMenu();
    });
  }

  changeCurrentRoute(currentRoute: string) {
    this.NavbarOptions.forEach((item, index) => {
      item.active = false;
      if(currentRoute.includes(item.path)) this.NavbarOptions[index].active = true;
    })
  }

  changeMenuIsCurrent(currentRoute: string){
    if(currentRoute === '/home/menu') {
      this.userToken = sessionStorage.getItem('userToken');
      this.menuIsCurrent = true;
    } else {
      this.menuIsCurrent = false;
    }
  }

  changeMenuStatus() {
    this.showMenuNavbar = !this.showMenuNavbar;
  }

  detectAllowedMenu(){
    const allowedMenus = sessionStorage.getItem('modules');
    this.NavbarOptions.forEach((item, index) => {
      if(allowedMenus) {
        const allowedMenu = allowedMenus.includes(item.textToValidate)
        this.NavbarOptions[index].show = allowedMenu;
      }
    })

  }


}
