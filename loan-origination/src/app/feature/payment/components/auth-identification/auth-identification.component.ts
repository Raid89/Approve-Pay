import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-auth-identification',
  templateUrl: './auth-identification.component.html',
  styleUrls: ['./auth-identification.component.css']
})
export class AuthIdentificationComponent {

  controls$: Observable<ControlBase<any>[]>;

  constructor(private readonly authService: AuthService){
    this.controls$ = this.authService.getControlIdentification();
  }

  getInfo(event: any) {
    const {numeroDocumento} = event;
    console.log(numeroDocumento)
    this.authService.sendOtp(numeroDocumento).subscribe((resp) => {
      console.log(resp);
    })
  }



}
