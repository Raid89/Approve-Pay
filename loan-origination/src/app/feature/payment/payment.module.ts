import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthIdentificationComponent } from './components/auth-identification/auth-identification.component';




@NgModule({
  declarations: [
    
  
    AuthIdentificationComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    PaymentRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    NgxExtendedPdfViewerModule,
    PdfViewerModule
  ],
})
export class PaymentModule { }
