import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-identification',
  templateUrl: './auth-identification.component.html',
  styleUrls: ['./auth-identification.component.css']
})
export class AuthIdentificationComponent {

  public paymentsPending: boolean = false;
  public document: string = '';
  controls$: Observable<ControlBase<any>[]>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,  
  ){
    this.controls$ = this.authService.getControlIdentification();
  }

  getInfo(event: any) {
    this.alertWait('Espere un momento por favor...');
    const {numeroDocumento} = event;
    this.document = numeroDocumento.toString();
    this.authService.document = numeroDocumento;
    this.authService.sendOtp(this.document).subscribe((resp: any) => {
      Swal.close();
      if(resp.validationStrategy === 'SUCCESS') {
        this.authService.client = resp;
        this.router.navigate(['/code']);
      }

      if(resp.validationStrategy === 'UP_T0_DATE') {
        this.paymentsPending = true;
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

  navigateApprobe() {
    window.location.href = environment.approbeUrl;
  }



}
