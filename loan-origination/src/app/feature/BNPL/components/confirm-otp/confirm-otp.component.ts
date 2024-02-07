import { Component, OnInit } from '@angular/core';
import { BnplService } from '../../shared/services/bnpl.service';
import { Observable } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IdentityvalidationService } from '../../shared/services/identityvalidation.service';
import { OtherOtp } from '../../shared/models/other-otp.model';
import { DataInformation } from '../../shared/models/data-information.model';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.css'],
})
export class ConfirmOtpComponent implements OnInit {
  public controlsOtp$: Observable<ControlBase<any>[]>;
  public mostrarNuevoCodigo: boolean = false;
  public mostrarError: boolean = false;
  public dataInformation: DataInformation;
  public timesCircle = faTimesCircle;
  public checkCircle = faCheckCircle;
  public otp: any;

  constructor(
    private readonly bnplService: BnplService,
    private readonly validationStrategyService: IdentityvalidationService,
    private readonly router: Router
  ) {
    this.dataInformation = this.bnplService.personalInformation;
    this.controlsOtp$ = this.bnplService.getOtpControls();
  }
  ngOnInit(): void {
    Swal.close();
  }

  getConfirmOtp({ otp }: any) {
    this.alertWait('Espere un momento por favor...');
    let data = {
      actionStrategyPattern: 'VALIDATE_STRATEGY',
      id: localStorage.getItem('id'),
      otp: otp,
      validationStrategy: {
        validationStrategy: 'RECONOCER',
      },
    };
    this.validationStrategyService.postPreguntasEvidente(data).subscribe({
      next: (resp: any) => {
        Swal.close();
        if(resp.validationStrategy === 'CREDIT_APPROVED') {
          this.bnplService.creditEmit = resp;
          this.router.navigate(['/summary-credit']);
        }
        if (resp.validationStrategy === 'ERROR_VALIDATE_OTP') {
          this.mostrarError = true
        }
        if (resp.validationStrategy === 'CREDIT_DENIED') {
          this.bnplService.creditEmit = resp;
          this.router.navigate(['/await-alert', 'reconocer']);
        }
      },
      error: (e: any) => {
        window.location.href = this.dataInformation.urlRedirect;
      },
    });
    // this.mostrarError = true;
  }

  alertWait(text: any) {
    Swal.fire({
      title: text,
      allowOutsideClick: false,
      icon: 'info',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  enviarNuevoOtp() {
    let data: OtherOtp = {
      id: localStorage.getItem('id') || "",
      actionStrategyPattern: 'RESEND_OTP',
    };
    this.validationStrategyService
      .getOtherOtp(data)
      .subscribe((resp: any) => {
        console.log(resp)
        this.mostrarError = false;
        if (resp.validationStrategy === 'SEND_OTP') {
          this.mostrarNuevoCodigo = true;
          setTimeout(() => {
            this.mostrarNuevoCodigo = false;
          }, 5000);
        }
      }, (error: any) => {
        window.location.href = this.dataInformation.urlRedirect;
      });
  }
}
