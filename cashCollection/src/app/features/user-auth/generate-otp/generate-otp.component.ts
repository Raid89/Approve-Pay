import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Toast, ToastService } from '../../../shared/components/toast/toast.service';
import { AuthService } from '../../../core/services/auth.service';
import { IFinancialData } from '../../../shared/interfaces/auth.interfaces';
import { Router } from '@angular/router';
import { LoadingScreenService } from '../../../shared/components/loading-screen/loading-screen.service';


@Component({
  selector: 'app-generate-otp',
  templateUrl: './generate-otp.component.html',
  styleUrl: './generate-otp.component.scss'
})
export class GenerateOtpComponent implements OnInit {
  public userToken = sessionStorage.getItem('userToken');
  public inputFocus = false;
  public isLoading = false;
  public loadingScreen = false;

  identificationControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.maxLength(10),
    Validators.minLength(5)
  ]);

  constructor(
    private toastService: ToastService, 
    private authService: AuthService,
    private router: Router,
    private loadingScreenS: LoadingScreenService,
  ){}

  ngOnInit(): void {
    if(sessionStorage.getItem('userToken')) this.router.navigate(['/home']); 
  }
  
  showToast(type: Toast['type'], message: string) {
    this.toastService.showToast({ type, message });
  }

  sanitizeInput() {
    const value: any = this.identificationControl.value;
    this.identificationControl.setValue(value.replace(/[^0-9]/g, ''));
  }

  getErrorMessage() {
    if (this.identificationControl.hasError('required')) {
      return 'El campo es obligatorio';
    }
    if (this.identificationControl.hasError('pattern')) {
      return 'Solo se permiten números';
    }
    if (this.identificationControl.hasError('maxlength')) {
      return 'Máximo 10 caracteres';
    }
    if (this.identificationControl.hasError('minlength')) {
      return 'Minimo 5 caracteres';
    }
    return '';
  }

  sendOtp() {
    this.isLoading = true;
    const loadTimeOut = setTimeout(() => this.loadingScreenS.loadingScreen = true, 1000);
    
    
    if(this.identificationControl.status === 'INVALID') {
      return this.showToast('warning', 'Verifica tus datos e ingrésalos nuevamente')
    }

    const observerSendOtp = {
      next: (response: IFinancialData) => {
        clearTimeout(loadTimeOut);
        this.loadingScreenS.loadingScreen = false;

        if(response.validationStrategy === "UP_T0_DATE"){
          const msg =  'Verifica tus datos e ingrésalos nuevamente'
          this.showToast('warning', msg)
        }
        
        if(response.validationStrategy === "SUCCESS"){
          this.authService.userData = response;
          const identificationValue = this.identificationControl.value;
          if (identificationValue !== null) sessionStorage.setItem('userDocument', identificationValue);
          sessionStorage.removeItem('countdownSecondsLeft');
          this.router.navigate(['/auth/validate']);
        }
        this.isLoading = false;
      },

      error: (err: any) => {
        this.loadingScreenS.loadingScreen = false;
        const msg =  'Ha ocurrido un error por favor intenta más tarde'
        this.showToast('error', msg)
        this.isLoading = false;
      }
    }

    this.authService.sendOptCode(this.identificationControl.value).subscribe(observerSendOtp)
  }

  
}
