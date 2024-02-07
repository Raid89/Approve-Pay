import { Component, ViewEncapsulation, OnInit, TemplateRef } from '@angular/core';
import { BnplService } from '../../shared/services/bnpl.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DocumentsRequest } from '../../shared/models/documents-request.model';
import { Document } from '../../shared/models/documents.model';
import { SignDocument } from '../../shared/models/sign-document.model';
import Swal from 'sweetalert2';
import { Payment } from '../../shared/models/payment.model';
import { OtherOtp } from '../../shared/models/other-otp.model';
import { IdentityvalidationService } from '../../shared/services/identityvalidation.service';
import { DataInformation } from '../../shared/models/data-information.model';

@Component({
  selector: 'app-sign-documents',
  templateUrl: './sign-documents.component.html',
  styleUrls: ['./sign-documents.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignDocumentsComponent {

  public showFormOtp: boolean = false;
  public controls$: Observable<ControlBase<any>[]>;
  public mostrarNuevoCodigo: boolean = false;
  public mostrarError: boolean = false;
  public timesCircle = faTimesCircle;
  public checkCircle = faCheckCircle;
  public documents: Document[] = [];
  public dataInformation: DataInformation;
  modalRef?: BsModalRef;

  constructor(
    private readonly bnplService: BnplService,
    private readonly router: Router,
    private readonly modalService: BsModalService,
    private readonly validationStrategyService: IdentityvalidationService
  ){
    this.dataInformation = this.bnplService.personalInformation;
    this.controls$ = this.bnplService.getOtpControls();
    const data: DocumentsRequest = {
      actionStrategyPattern: 'GENERATE_DOCUMENTS',
      id: localStorage.getItem('id') || ""
    }
    this.bnplService.getDocuments(data).subscribe((resp: Document[]) => {
      this.documents = resp;
      Swal.close();
    });
  }


  getConfirmOtp({otp}: any){
    this.alertWait('Espere un momento por favor...');
    
    const contratoMutuo = this.documents.find((document) => document.name === '_Contrato_de_mutuo');
    if(contratoMutuo) {
      const signDocument: SignDocument = {
        actionStrategyPattern: 'VALIDATE_OTP_SIGNATURE_DOCUMENTS',
        contratoMutuo: contratoMutuo,
        id: localStorage.getItem('id') || "",
        otp
      };
      this.bnplService.signDocument(signDocument).subscribe((resp: Payment) => {
        Swal.close();
        if(resp.validationStrategy === 'ERROR_VALIDATE_OTP') {
          this.mostrarError = true;
        }

        if(resp.validationStrategy === 'ERROR_VALIDATE_OTP') {
          this.mostrarError = true;
        }

        if(resp.validationStrategy === 'ERROR_WHEN_SIGNING') {
          Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: 'Lamentablemente, encontramos un problema con la firma de los documentos que respaldan tu solicitud de crédito y no se pudieron firmar correctamente.',
            showConfirmButton: true,
          });
          if(this.dataInformation.urlRedirect) {
            window.location.href = this.dataInformation.urlRedirect;
          }
        }

        if(resp.validationStrategy === 'SAVE_CREDIT') {
          this.bnplService.payment = resp;
          this.router.navigate(['/payment']);
        }


      })

    }
  }

  enviarNuevoOtp(){
    let data: OtherOtp = {
      id: localStorage.getItem('id') || "",
      actionStrategyPattern: 'RESEND_OTP',
    };
    this.validationStrategyService
      .getOtherOtp(data)
      .subscribe((resp: any) => {
        console.log(resp)
        this.mostrarError = false;
        if (resp.validationStrategy === 'SEND_OTP') {
          this.mostrarNuevoCodigo = true;
          setTimeout(() => {
            this.mostrarNuevoCodigo = false;
          }, 5000);
        }
      });
    // this.mostrarError = false;
    // this.mostrarNuevoCodigo = true;
    // setTimeout(() => {
    //   this.mostrarNuevoCodigo = false;
    // }, 5000);
  }

  abrirDocumento(modalDocumento: TemplateRef<any>, document: any) {
    this.modalRef = this.modalService.show(modalDocumento, {
      class: 'modal-dialog modal-xl',
      initialState: {
        documento: document
      }
    });
  }

  alertWait(text: any) {
    Swal.fire({
      title: text,
      allowOutsideClick: false,
      icon: 'info',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

}
