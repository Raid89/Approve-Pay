import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthIdentificationComponent } from './components/auth-identification/auth-identification.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';


const routes: Routes = [
  {
    path: '',
    component: AuthIdentificationComponent
  },
  {
    path: 'code',
    component: VerificationCodeComponent
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

