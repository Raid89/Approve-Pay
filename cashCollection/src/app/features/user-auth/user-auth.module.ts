import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
import { SharedModule } from '../../shared/shared.module';
import { ValidateOtpComponent } from './validate-otp/validate-otp.component';
import { OtpInputComponent } from './validate-otp/otp-input/otp-input.component';
import { FormsModule } from '@angular/forms';
import { CountdownComponent } from './validate-otp/countdown/countdown.component';


@NgModule({
  declarations: [
    GenerateOtpComponent,
    ValidateOtpComponent,
    OtpInputComponent,
    CountdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserAuthRoutingModule,
    SharedModule
  ]
})
export class UserAuthModule { }
