import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { BasicDataComponent } from './components/basic-data/basic-data.component';
import { IdentityValidationComponent } from './components/identity-validation/identity-validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BnplRoutingModule } from './bnpl-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { SelectionFeesComponent } from './components/selection-fees/selection-fees.component';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SummaryCreditComponent } from './components/summary-credit/summary-credit.component';
import { SignDocumentsComponent } from './components/sign-documents/sign-documents.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PdfContentComponent } from './components/pdf-content/pdf-content.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { OnboardingComponent } from './components/onboarding/onboarding.component';



@NgModule({
  declarations: [
    BasicDataComponent,
    IdentityValidationComponent,
    PersonalInformationComponent,
    SelectionFeesComponent,
    ConfirmOtpComponent,
    SummaryCreditComponent,
    SignDocumentsComponent,
    PaymentComponent,
    PdfContentComponent,
    OnboardingComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    BnplRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    NgxExtendedPdfViewerModule,
    PdfViewerModule
  ],
})
export class BNPLModule { }
