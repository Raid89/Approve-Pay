import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoadingScreenService } from '../../../shared/components/loading-screen/loading-screen.service';
import { Toast, ToastService } from '../../../shared/components/toast/toast.service';
import { CreditData } from '../../../shared/interfaces/receipt.interface';
import { ReceiptsService } from '../../../core/services/receipts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrl: './search-client.component.scss'
})
export class SearchClientComponent {

  public inputFocus = false;
  public isLoading = false;
  public loadingScreen = false;
  public buttonDisabled = false;

  clientIdentificationControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.maxLength(10),
    Validators.minLength(5)
  ]);

  constructor(
    private loadingScreenS: LoadingScreenService,
    private toastService: ToastService,
    private receiptService: ReceiptsService,
    private router: Router
  ){}

  sanitizeInput() {
    const value: any = this.clientIdentificationControl.value;
    this.clientIdentificationControl.setValue(value.replace(/[^0-9]/g, ''));
  }

  getErrorMessage() {
    if (this.clientIdentificationControl.hasError('required')) {
      return 'El campo es obligatorio';
    }
    if (this.clientIdentificationControl.hasError('pattern')) {
      return 'Solo se permiten números';
    }
    if (this.clientIdentificationControl.hasError('maxlength')) {
      return 'Máximo 10 caracteres';
    }
    if (this.clientIdentificationControl.hasError('minlength')) {
      return 'Minimo 5 caracteres';
    }
    return '';
  }

  showToast(type: Toast['type'], message: string) {
    this.toastService.showToast({ type, message });
  }

  getClientCredits() {
    this.isLoading = true;
    const loadTimeOut = setTimeout(() => this.loadingScreenS.loadingScreen = true, 1000);
    
    
    if(this.clientIdentificationControl.status === 'INVALID') {
      return this.showToast('warning', 'Verifica tus datos e ingrésalos nuevamente')
    }

    const observerSendOtp = {
      next: (response: CreditData[]) => {
        clearTimeout(loadTimeOut);
        this.loadingScreenS.loadingScreen = false;
        if(this.clientIdentificationControl.value !== null) {
          sessionStorage.setItem('documentClient', this.clientIdentificationControl.value);
        }
        this.receiptService.creditsData = response;
        this.router.navigate(['/receipts/customer-info']);
        this.isLoading = false;
      },

      error: (err: any) => {
        clearTimeout(loadTimeOut);
        this.loadingScreenS.loadingScreen = false;
        if(err.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['']);
        }else{
          const msg =  'Ha ocurrido un error por favor intenta más tarde'
          this.showToast('error', msg)
          this.isLoading = false;
        }
        
      }
    }

    this.receiptService.getClientCredits(this.clientIdentificationControl.value).subscribe(observerSendOtp)
  }
}
