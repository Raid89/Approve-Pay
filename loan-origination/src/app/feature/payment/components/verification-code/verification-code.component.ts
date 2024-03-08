import { Component, OnInit, ViewChild } from '@angular/core';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { AuthService } from '../../shared/services/auth.service';
import { OtpResponse } from '../../shared/models/otpResponse.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.css']
})
export class VerificationCodeComponent implements OnInit {

  otp: string = '';
  timer: number = 300; // 5 minutes in seconds
  client: any = {};
  public mostrarError: boolean = false;
  public mostrarNuevoCodigo: boolean = false;
  public checkCircle = faCheckCircle;
  @ViewChild(NgOtpInputComponent, {static: false}) ngOtpInput!: NgOtpInputComponent;
  
  config: NgOtpInputConfig = {
    length: 4,
    inputClass: 'input-code',
    containerClass: '.contenedor-code-verification .contenedor-code-verification__form-code .contenedor-code-verification__code',
    allowNumbersOnly: true,
  }

  constructor(private authService: AuthService, private router: Router) {
    this.client = this.authService.client;
  }

  ngOnInit(): void {
    this.startTimer();
  }

  onOtpChange(event: string) {
    this.otp = event;
  }
  
  getFormattedTime() {
    const minutes: number = Math.floor(this.timer / 60);
    const seconds: number = this.timer - minutes * 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }
  
  pad(num: number) {
    return ('00' + num).slice(-2);
  }
  
  resendOtp() {
    this.authService.sendOtp(this.authService.document).subscribe((resp: any) => {
      Swal.close();
      if(resp.validationStrategy === 'SUCCESS') {
        this.mostrarError = false;
        this.mostrarNuevoCodigo = true;
        setTimeout(() => {
          this.mostrarNuevoCodigo = false;
        }, 5000);
      }
      
      if(resp.validationStrategy === 'UP_T0_DATE') {
        this.router.navigate(['/']);
      }
    });
  }
  
  startTimer() {
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(interval);
        // Timer has reached 0, do something here
      }
    }, 1000); // 1 second interval
  }
  
  validarOtp() {
    this.alertWait('Espere un momento por favor...');
    this.authService.validateOtp(this.otp, this.authService.document).subscribe((response: OtpResponse) => {
      Swal.close();
      this.ngOtpInput.setValue('');
      if (response.validationStrategy === 'ERROR') {
        this.mostrarError = true;
      }

      if (response.validationStrategy === 'SUCCESS') {
        this.mostrarError = false;
        localStorage.setItem('token', response.token);
        this.router.navigate(['/credits'])
      }
    });
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
