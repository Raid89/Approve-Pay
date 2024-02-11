import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthIdentificationComponent } from './components/auth-identification/auth-identification.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { ListCreditsComponent } from './components/list-credits/list-credits.component';


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
