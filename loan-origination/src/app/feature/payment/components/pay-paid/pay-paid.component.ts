import { Component, OnInit, inject } from '@angular/core';
import { Credit } from '../../shared/models/credit.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-pay-paid',
  templateUrl: './pay-paid.component.html',
  styleUrls: ['./pay-paid.component.css']
})
export class PayPaidComponent implements OnInit {

  creditSelected!: Credit;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.creditSelected = this.authService.credit; 
  }

  activeCuota: boolean = false;
  activeTotal: boolean = false;
  activeCuotaResponsive: boolean = false;
  activeTotalResponsive: boolean = false;

  optionSelected(option: string) {
    if(option === 'cuota') {
      this.activeCuota = true;
      this.activeTotal = false;
    }

    if(option === 'deuda') {
      this.activeCuota = false;
      this.activeTotal = true;
    }
  }

  optionSelectedResponsive(option: string) {
    if(option === 'cuota') {
      this.activeCuotaResponsive = true;
      this.activeTotalResponsive = false;
    }

    if(option === 'deuda') {
      this.activeCuotaResponsive = false;
      this.activeTotalResponsive = true;
    }
  }

  paymentPartial() {
    this.authService.createPay(this.creditSelected.id, false).subscribe( res => {
      console.log(res);
    });
  }

  paymentTotal() {
    this.authService.createPay(this.creditSelected.id, true).subscribe( res => {
      console.log(res);
    });
  }

}
