import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BnplService } from '../../shared/services/bnpl.service';
import { CreditApprobe } from 'src/app/core/shared/models/credit-approbe.model';
import Swal from 'sweetalert2';
import { FirstStep } from '../../shared/models/first-step.model';
import { StepsInformation } from '../../shared/models/stepsInformation.model';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Client } from '../../shared/models/client.model';
import { ThridStep } from '../../shared/models/thrid-step.model';

@Component({
  selector: 'app-summary-credit',
  templateUrl: './summary-credit.component.html',
  styleUrls: ['./summary-credit.component.css']
})
export class SummaryCreditComponent implements OnInit, OnDestroy {

  public summaryCredit: CreditApprobe;
  public personalInformation: StepsInformation;
  public clientInformation: Client;
  public fees: number = 6;
  public feesBenefits: number = 3.0;
  faAngle= faAngleDown;


  constructor(
    private readonly router: Router,
    private readonly bnplService: BnplService
  ){
    this.summaryCredit = this.bnplService.creditEmit;
    this.personalInformation = this.bnplService.stepsInformation;
    this.clientInformation = this.bnplService.stepsInformation.thirdStep.client;
  }
  ngOnDestroy(): void {
    const body = document.querySelector('body');
    if(body !== null) {
      body.style.backgroundColor = '#FAFAFA';
    }
  }

  ngOnInit(): void {
    const body = document.querySelector('body');
    if(body !== null) {
      body.style.backgroundColor = '#7DFFB2';
    }
  }

  navigateSignDocuments() {
    this.alertWait('Espere un momento por favor...')
    this.router.navigate(['/sign-documents']);
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
