import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDataComponent } from './components/basic-data/basic-data.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { SelectionFeesComponent } from './components/selection-fees/selection-fees.component';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { IdentityValidationComponent } from './components/identity-validation/identity-validation.component';
import { AlertComponent } from 'src/app/core/components/alert/alert.component';
import { SummaryCreditComponent } from './components/summary-credit/summary-credit.component';
import { SignDocumentsComponent } from './components/sign-documents/sign-documents.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingComponent
  },
  {
    path: 'basic-data',
    component: BasicDataComponent
  },
  {
    path: 'personal-information',
    component: PersonalInformationComponent
  },
  {
    path: 'selection-fees',
    component: SelectionFeesComponent
  },
  {
    path: 'confirm-otp',
    component: ConfirmOtpComponent
  },
  {
    path: 'identity-validation',
    component: IdentityValidationComponent
  },
  {
    path: 'await-alert/:strategy',
    component: AlertComponent
  },
  {
    path: 'summary-credit',
    component: SummaryCreditComponent
  },
  {
    path: 'sign-documents',
    component: SignDocumentsComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
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
export class BnplRoutingModule { }

