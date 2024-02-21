import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthIdentificationComponent } from './components/auth-identification/auth-identification.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { ListCreditsComponent } from './components/list-credits/list-credits.component';
import { PayPaidComponent } from './components/pay-paid/pay-paid.component';
import { AlertPayComponent } from './components/alert-pay/alert-pay.component';


const routes: Routes = [
  {
    path: '',
    component: AuthIdentificationComponent
  },
  {
    path: 'code',
    component: VerificationCodeComponent
  },
  {
    path: 'credits',
    component: ListCreditsComponent
  },
  {
    path: 'pay',
    component: PayPaidComponent
  },
  {
    path: 'alert-pay',
    component: AlertPayComponent
  }
  
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PaymentRoutingModule { }

