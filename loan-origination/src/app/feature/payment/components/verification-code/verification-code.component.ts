import { Component } from '@angular/core';
import { NgOtpInputConfig } from 'ng-otp-input';
import { AuthService } from '../../shared/services/auth.service';
import { OtpResponse } from '../../shared/models/otpResponse.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent {

  otp: string = '';
  public mostrarError: boolean = false;

  config: NgOtpInputConfig = {
    length: 4,
    inputClass: 'input-code',
    containerClass: '.contenedor-code-verification .contenedor-code-verification__form-code .contenedor-code-verification__code',
    allowNumbersOnly: true,
  }

  constructor(private authService: AuthService, private router: Router) {

  }

  onOtpChange(event: string) {
    this.otp = event;
  }

  validarOtp() {
    this.authService.validateOtp(this.otp, this.authService.document).subscribe((response: OtpResponse) => {
      if (response.validationStrategy === 'ERROR') {
        this.mostrarError = true;
      }

      if (response.validationStrategy === 'SUCCESS') {
        this.mostrarError = false;
        this.router.navigate(['/credits'])
      }
    });
  }

}
