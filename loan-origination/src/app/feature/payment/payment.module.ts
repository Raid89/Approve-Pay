import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthIdentificationComponent } from './components/auth-identification/auth-identification.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ListCreditsComponent } from './components/list-credits/list-credits.component';
import { PayPaidComponent } from './components/pay-paid/pay-paid.component';
import { AlertPayComponent } from './components/alert-pay/alert-pay.component';




@NgModule({
  declarations: [
    
  
    AuthIdentificationComponent,
    VerificationCodeComponent,
    ListCreditsComponent,
    PayPaidComponent,
    AlertPayComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    PaymentRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgOtpInputModule,
    ModalModule.forRoot(),
  ],
})
export class PaymentModule { }
