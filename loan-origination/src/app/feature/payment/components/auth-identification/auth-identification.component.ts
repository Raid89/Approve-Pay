import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.alertAwait('Espere un momento por favor...');
    const {numeroDocumento} = event;
    this.document = numeroDocumento.toString();
    this.authService.document = numeroDocumento;
    this.authService.sendOtp(this.document).subscribe((resp: string) => {
      Swal.close();
      if(resp === 'SUCCESS') {
        this.router.navigate(['/code']);
      }

      if(resp === 'UP_T0_DATE') {
        this.paymentsPending = true;
      }
    });
  }

  alertAwait(text: string) {
    Swal.fire({
      text: text,
      icon: 'info',
      showConfirmButton: false,
    });
  }



}
