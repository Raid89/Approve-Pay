import { Component, OnInit, inject } from '@angular/core';
import { Credit } from '../../shared/models/credit.model';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay-paid',
  templateUrl: './pay-paid.component.html',
  styleUrls: ['./pay-paid.component.css']
})
export class PayPaidComponent implements OnInit {

  creditSelected!: Credit;
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.creditSelected = this.authService.credit; 
  }

  activeCuota: boolean = false;
  activeTotal: boolean = false;
  activeOtroValor: boolean = false;
  otroValor: number = 0;
  activeCuotaResponsive: boolean = false;
  activeOtroValorResponsive: boolean = false;
  activeTotalResponsive: boolean = false;
  status: string = '';

  optionSelected(option: string) {
    if(option === 'cuota') {
      this.activeCuota = true;
      this.activeTotal = false;
      this.activeOtroValor = false;
    }

    if(option === 'deuda') {
      this.activeCuota = false;
      this.activeTotal = true;
      this.activeOtroValor = false;
    }
    if(option === 'otro-valor') {
      this.activeCuota = false;
      this.activeTotal = false;
      this.activeOtroValor = true;
    }
  }

  optionSelectedResponsive(option: string) {
    if(option === 'cuota') {
      this.activeCuotaResponsive = true;
      this.activeTotalResponsive = false;
      this.activeOtroValorResponsive = false;
    }

    if(option === 'deuda') {
      this.activeCuotaResponsive = false;
      this.activeTotalResponsive = true;
      this.activeOtroValorResponsive = false;
    }
    if(option === 'otro-valor') {
      this.activeCuotaResponsive = false;
      this.activeTotalResponsive = false;
      this.activeOtroValorResponsive = true;
    }
  }

  paymentPartial() {
    this.alertWait('Espere un momento por favor...');
    this.authService.refreshToken().subscribe( res => {
      if(res === 'ok') {
        this.authService.createPay(this.creditSelected.id, false, this.creditSelected.nextPaid).subscribe( res => {
          Swal.close();
          if(res.status === 'ok') {
            this.status = 'ok';
            this.authService.urlClient = res.eCollectUrl;
            window.location.href = this.authService.urlClient;
            // this.router.navigate(['/alert-pay', this.status]);
          }
          if(res.status !== 'ok') {
            this.status = 'fail';
            this.router.navigate(['/alert-pay', this.status]);
          }
        });
      }

      if(res !== 'ok') {
        this.status = 'fail';
        this.router.navigate(['/alert-pay', this.status]);
      }
    })
  }

  paymentTotal() {
    console.log(this.otroValor);
    this.alertWait('Espere un momento por favor...');
    this.authService.refreshToken().subscribe( res => {
      if(res === 'ok') {
        this.authService.createPay(this.creditSelected.id, true, this.creditSelected.saldoCredito).subscribe( res => {
          Swal.close();
          if(res.status === 'ok') {
            this.status = 'ok';
            this.authService.urlClient = res.eCollectUrl;
            window.location.href = this.authService.urlClient;
            // this.router.navigate(['/alert-pay', this.status]);
          }
          if(res.status !== 'ok') {
            this.status = 'fail';
            this.router.navigate(['/alert-pay', this.status]);
          }
        });
      }

      if(res !== 'ok') {
        this.status = 'fail';
        this.router.navigate(['/alert-pay', this.status]);
      }
    })
  }
  paymentOtroValor() {
    console.log(this.otroValor);
    this.alertWait('Espere un momento por favor...');
    this.authService.refreshToken().subscribe( res => {
      if(res === 'ok') {
        this.authService.createPay(this.creditSelected.id, true, this.otroValor).subscribe( res => {
          Swal.close();
          if(res.status === 'ok') {
            this.status = 'ok';
            this.authService.urlClient = res.eCollectUrl;
            window.location.href = this.authService.urlClient;
            // this.router.navigate(['/alert-pay', this.status]);
          }
          if(res.status !== 'ok') {
            this.status = 'fail';
            this.router.navigate(['/alert-pay', this.status]);
          }
        });
      }

      if(res !== 'ok') {
        this.status = 'fail';
        this.router.navigate(['/alert-pay', this.status]);
      }
    })
  }

  alertWait(text: any) {
    Swal.fire({
      title: text,
      allowOutsideClick: false,
      imageUrl: '../../../../assets/img/AppLoader.gif',
      showConfirmButton: false,
    });
  }

}
