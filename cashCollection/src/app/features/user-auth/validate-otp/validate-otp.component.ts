import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { IFinancialData, IUserValidData } from '../../../shared/interfaces/auth.interfaces';
import { Router } from '@angular/router';
import { Toast, ToastService } from '../../../shared/components/toast/toast.service';
import { LoadingScreenService } from '../../../shared/components/loading-screen/loading-screen.service';
import { CountdownComponent } from './countdown/countdown.component';

@Component({
  selector: 'app-validate-otp',
  templateUrl: './validate-otp.component.html',
  styleUrl: './validate-otp.component.scss'
})
export class ValidateOtpComponent implements OnInit {

  @ViewChild(CountdownComponent) countdownComponent!: CountdownComponent;

  public userData?: IFinancialData | null;
  public buttonDisabled = true;
  public countdownValue: string = '';

  private inputValue: string = '';

  constructor(
    private authService: AuthService,
    private toastService: ToastService, 
    private router: Router,
    private loadingScreenS: LoadingScreenService,
  ) {}

  ngOnInit(): void {
      if(sessionStorage.getItem('userToken')) this.router.navigate(['/home']); 
      this.userData = this.authService.userData;
      if(this.userData === null) this.router.navigate(['/']); 
  }

  showToast(type: Toast['type'], message: string) {
    this.toastService.showToast({ type, message });
  }

  restartCountdown(): void {
    this.countdownComponent.restartCountdown();
  }

  onInputValueComplete(value: string): void {
    this.inputValue = value;
    this.buttonDisabled = this.inputValue.length < 4
  }

  resendOtp() { 
    const userDocument = sessionStorage.getItem('userDocument');
    this.loadingScreenS.loadingScreen = true;
    const observerSendOtp = {
      next: (response: IFinancialData) => {
        this.loadingScreenS.loadingScreen = false;

        if(response.validationStrategy === "SUCCESS"){
          this.authService.userData = response;
          this.restartCountdown()
          const msg =  'El código se ha reenviado exitosamente.'
          this.showToast('info', msg)
        }

      },

      error: (err: any) => {
        this.loadingScreenS.loadingScreen = false;
        const msg =  'Ha ocurrido un error por favor intenta más tarde'
        this.showToast('error', msg)
      }
    }
    this.authService.sendOptCode(userDocument).subscribe(observerSendOtp);
  }

  validateOtp() {
    this.loadingScreenS.loadingScreen = true;
    const errorMsg = 'Código incorrecto, por favor valide su código e intente nuevamente'
    if(this.inputValue.length < 4) return this.showToast('warning', errorMsg);

    const observerValidOtp = {
      next: (response: IUserValidData) => {
        if(response.validationStrategy === 'ERROR') {
          this.loadingScreenS.loadingScreen = false;
          this.showToast('warning', errorMsg);
        } 
        if(response.validationStrategy === 'SUCCESS') {
          sessionStorage.setItem('userToken', response.token);
          sessionStorage.setItem('modules', response.accessList);
          this.loadingScreenS.loadingScreen = false;
          this.router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        this.loadingScreenS.loadingScreen = false;
        const msg =  'Ha ocurrido un error por favor intenta más tarde'
        this.showToast('error', msg)
      }
    }

    this.authService.validateOtpCode(this.inputValue).subscribe(observerValidOtp);
  }


}
