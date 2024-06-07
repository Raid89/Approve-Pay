import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { IFinancialData, IUserValidData } from '../../interfaces/auth.interfaces';
import { AuthService } from '../../../core/services/auth.service';

interface INavbarOptions {
  text: string,
  path: string,
  active: boolean,
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
      path: '/receipts',
      active: false
    },

    {
      text: 'Historial',
      path: '/history',
      active: false
    },

    {
      text: 'Dispersión',
      path: '/dispersion',
      active: false
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
      this.changeCurrentRoute(currentRoute);
      this.changeMenuIsCurrent(currentRoute);
    });
  }

  changeCurrentRoute(currentRoute: string) {
    this.NavbarOptions.forEach(item => {
      item.active = false;
      if(item.path === currentRoute) item.active = true;
    })
  }

  changeMenuIsCurrent(currentRoute: string){
    if(currentRoute === '/home') {
      this.menuIsCurrent = true;
    } else {
      this.menuIsCurrent = false;
    }
  }

  changeMenuStatus() {
    this.showMenuNavbar = !this.showMenuNavbar;
  }


}
