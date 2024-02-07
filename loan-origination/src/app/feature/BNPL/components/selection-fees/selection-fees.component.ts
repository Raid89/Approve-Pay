import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { BnplService } from '../../shared/services/bnpl.service';
import { Router } from '@angular/router';
import { Parameter } from '../../shared/models/parameters.model';
import { ThridStep } from '../../shared/models/thrid-step.model';
import { IdentityvalidationService } from '../../shared/services/identityvalidation.service';
import { ValidationStrategy } from '../../shared/models/validation-strategy-response.model';
import { Client } from '../../shared/models/client.model';
import Swal from 'sweetalert2';
import { DataInformation } from '../../shared/models/data-information.model';

@Component({
  selector: 'app-selection-fees',
  templateUrl: './selection-fees.component.html',
  styleUrls: ['./selection-fees.component.css'],
})
export class SelectionFeesComponent implements OnInit {
  public selectionFees$!: Observable<ControlBase<any>[]>;
  public maxCreditTerm: string = '';
  public minCreditTerm: string = '';
  public arrayFees: number[] = [];
  public dataInformation!: DataInformation;
  public mostrarReferencia: string = '';
  public clientSelected!: Client;

  constructor(
    private readonly bnplService: BnplService,
    private readonly identityValidationService: IdentityvalidationService,
    private readonly router: Router
  ) {
  }
  ngOnInit(): void {
    this.dataInformation = this.bnplService.personalInformation;
    if (this.dataInformation.ammount) {
      this.mostrarReferencia = 'mostrarReferencia';
      this.bnplService.clients.subscribe((resp: Client[]) => {
        const [client] = resp.filter(
          (client) => client.id === this.dataInformation.client
        );
        this.clientSelected = client;
        console.log(this.clientSelected);
        
        console.log(this.bnplService.stepsInformation.thirdStep);
        let j = 0;
        for (
          let i = client.minCreditTerm;
          i <= client.maxCreditTerm;
          i++, j++
        ) {
          this.arrayFees[j] = i;
        }
        this.selectionFees$ = this.bnplService.getSelectionFeesControlsWithRef(
          this.arrayFees
        );
      });
      console.log(this.arrayFees);
      this.selectionFees$ = this.bnplService.getSelectionFeesControlsWithRef(
        this.arrayFees
      );
    } else {
      this.mostrarReferencia = 'mostrarFormulario';
      this.selectionFees$ = this.bnplService.getSelectionFeesControls(
        this.arrayFees
      );
    }
  }

  getClientSelected(clientSelected: string) {
    if (clientSelected) {
      this.bnplService.clients.subscribe((resp: Client[]) => {
        this.arrayFees = [];
        const [client] = resp.filter((client) => client.id === clientSelected);
        this.clientSelected = client;
        let j = 0;
        for (
          let i = client.minCreditTerm;
          i <= client.maxCreditTerm;
          i++, j++
        ) {
          this.arrayFees[j] = i;
        }
        this.selectionFees$ = this.bnplService.getSelectionFeesControls(
          this.arrayFees
        );
      });
    }
  }

  

  getSelectionFees(numeroCuotas: ThridStep) {
    this.bnplService.stepsInformation.thirdStep = numeroCuotas;
    this.bnplService.stepsInformation.thirdStep.client = this.clientSelected;
    console.log(this.dataInformation.client);
    console.log(this.bnplService.stepsInformation.thirdStep.client);
    let data = {
      actionStrategyPattern: 'DEFINE_STRATEGY',
      tipoIdentificacionText:
        this.bnplService.stepsInformation.firstStep.tipoDocumento.description,
      tipoIdentificacion:
        this.bnplService.stepsInformation.firstStep.tipoDocumento.id,
      identificacion:
        this.bnplService.stepsInformation.firstStep.numeroDocumento,
      celularFormulario: this.bnplService.stepsInformation.firstStep.celular,
      name: this.bnplService.stepsInformation.secondStep.primerNombre,
      primerApellido:
        this.bnplService.stepsInformation.secondStep.primerApellido,
      fullName: `${this.bnplService.stepsInformation.secondStep.primerNombre} ${this.bnplService.stepsInformation.secondStep.primerApellido}`,
      emailFormulario: this.bnplService.stepsInformation.secondStep.email,
      fechaExpedicion: `${this.bnplService.stepsInformation.secondStep.dia}/${this.bnplService.stepsInformation.secondStep.mes}/${this.bnplService.stepsInformation.secondStep.anio}`,
      client: this.dataInformation.client
        ? this.dataInformation.client
        : `${this.bnplService.stepsInformation.thirdStep.client.id}`,
      ammount: this.dataInformation.ammount
        ? this.dataInformation.ammount
        : +this.bnplService.stepsInformation.thirdStep.monto,
      term: +this.bnplService.stepsInformation.thirdStep.numeroCuotas
      ? +this.bnplService.stepsInformation.thirdStep.numeroCuotas
      : this.dataInformation.term,
      referenciaPago: this.dataInformation.referenciaPago
        ? this.dataInformation.referenciaPago
        : this.bnplService.stepsInformation.thirdStep.referenciaPago,
      id: this.dataInformation.id ? this.dataInformation.id : null,
    };
    console.log(data);
    // this.alertWait('Espere un momento por favor...');
    if (data.ammount > this.clientSelected.maxAmmount) {
      Swal.fire({
        icon: 'info',
        title: 'Monto no permitido',
        text: 'El valor del pago a financiar excede el límite permitido.',
        timer: 3000,
        showCloseButton: true,
      });
    } else if (data.ammount < this.clientSelected.minAmmount) {
      Swal.fire({
        icon: 'info',
        title: 'Monto no permitido',
        text: 'El valor del pago a financiar es menor al mínimo permitido.',
        timer: 3000,
        showCloseButton: true,
      });
    } else {
      this.router.navigate(['/await-alert', 'espera']);
    }

    // this.router.navigate(['/confirm-otp'])
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
