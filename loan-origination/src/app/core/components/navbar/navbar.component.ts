import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar') navbar: ElementRef | undefined;
  @Input() rutas: string[] = [];

  faAngle = faAngleLeft;
  public showBack: boolean = true;
  public mostrarApprobe2: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) {
    
  }
  ngOnInit(): void {
    console.log(this.rutas);
  }

  goBack() {
    this.location.back();
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/summary-credit') {
          this.showBack = false;
          if (this.navbar !== null && this.navbar !== undefined) {
            this.navbar.nativeElement.style.gridTemplateColumns = '1fr';
          }
        }

        if (event.url == '/await-alert') {
          this.showBack = false;
          if (this.navbar !== null && this.navbar !== undefined) {
            this.navbar.nativeElement.style.gridTemplateColumns = '1fr';
          }
        }

        if (event.url == '/payment') {
          this.showBack = false;
          this.mostrarApprobe2 = true;
          if (this.navbar !== null && this.navbar !== undefined) {
            this.navbar.nativeElement.style.gridTemplateColumns = '1fr';
          }
        }
      }
    });
  }
}
