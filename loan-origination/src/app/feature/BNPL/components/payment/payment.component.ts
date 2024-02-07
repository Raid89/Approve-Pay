import { Component, OnInit } from '@angular/core';
import { BnplService } from '../../shared/services/bnpl.service';
import { Payment } from '../../shared/models/payment.model';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Router } from '@angular/router';
import { Client } from '../../shared/models/client.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payment: Payment;
  public datePaid: string;
  public clientInformation: Client;
  panelOpenState = false;
  faAngle= faAngleDown;

  constructor(
    private readonly bnplService: BnplService,
    private readonly router: Router
  ) {
    this.payment = this.bnplService.payment;
    this.clientInformation = this.bnplService.stepsInformation.thirdStep.client;
    const date = this.payment.datePaid.split('/').join('-');
    this.datePaid = this.formatDate(date);
  }

  formatDate(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'dd MMMM yyyy',{locale: es});
  }

  ngOnInit(): void {
    const navbar = document.querySelector('.navbar-approbe') as HTMLElement;
    if(navbar !== null) {
      navbar.style.backgroundColor ='#3886FF';
    }

    const body = document.querySelector('body');
    if(body !== null) {
      body.style.backgroundColor = '#3886FF';
    }
  }

  finish() {
    window.location.href = this.bnplService.personalInformation.urlRedirect;
  }

}
