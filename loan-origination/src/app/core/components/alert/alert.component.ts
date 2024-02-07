import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataInformation } from 'src/app/feature/BNPL/shared/models/data-information.model';
import { Questionarie } from 'src/app/feature/BNPL/shared/models/validation-strategy-response.model';
import { BnplService } from 'src/app/feature/BNPL/shared/services/bnpl.service';
import { IdentityvalidationService } from 'src/app/feature/BNPL/shared/services/identityvalidation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  public mostrarAlerta: string = 'espera';
  questionarie: Questionarie;
  public dataInformation: DataInformation;

  constructor(
    private readonly bnplService: BnplService,
    private readonly validationStrategyService: IdentityvalidationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    
  ){
    this.dataInformation = this.bnplService.personalInformation;
    this.questionarie = this.bnplService.questionarieEmit;
  } 
  ngOnInit(): void {

    const params = this.route.snapshot.params['strategy'];
    if(params === 'reconocer') {
      if(this.bnplService.creditEmit.validationStrategy === 'CREDIT_DENIED') {
        this.mostrarAlerta = 'rechazado';
      }

      if(this.bnplService.creditEmit.validationStrategy === 'ERROR') {
        this.mostrarAlerta = 'fallo';
      }
      if(this.bnplService.creditEmit.validationStrategy === 'ERROR_IDENTITY_VALIDATION') {
        this.mostrarAlerta = 'fallo';
      }
    }
    if(params === 'espera') {
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
        term: this.dataInformation.term
          ? this.dataInformation.term
          : +this.bnplService.stepsInformation.thirdStep.numeroCuotas,
        referenciaPago: this.dataInformation.referenciaPago
          ? this.dataInformation.referenciaPago
          : this.bnplService.stepsInformation.thirdStep.referenciaPago,
        id: this.dataInformation.id ? this.dataInformation.id : null,
      };
      this.validationStrategyService.getValidationStrategy(data).subscribe({
        next: async (resp: any) => {
          if (resp.validationStrategy === 'EVIDENTE') {
            localStorage.setItem('id', resp.id);
            this.bnplService.questionarieEmit = resp.questionarie;
            this.router.navigate(['/identity-validation']);
          }
          if (resp.validationStrategy === 'RECONOCER') {
            localStorage.setItem('id', resp.id);
            this.router.navigate(['/confirm-otp']);
          }
          if (resp.validationStrategy === 'ERROR_INTERNAL_POLICY') {
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por política interna no podemos continuar con tu solicitud',
            });
            if(this.dataInformation.urlRedirect) {
              window.location.href = this.dataInformation.urlRedirect;
            }
          }
          if(resp.errorMessage) {
            await Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al procesar tu solicitud. Revisa tu solicitud e intenta de nuevo',
            });
            if(this.dataInformation.urlRedirect) {
              window.location.href = this.dataInformation.urlRedirect;
            }
          }
          if (resp.validationStrategy === 'ERROR_MAX_TERM') {
            this.router.navigate(['await-alert', 'identidad'])
          }
        },
      });
    }

    if(params === 'identidad') {
      this.mostrarAlerta = 'fallo';
    }

    if(params === 'evidente'){
      if(localStorage.getItem('preguntas')) {
        const preguntas = JSON.parse(localStorage.getItem('preguntas') || "") ;
        let data = {
          actionStrategyPattern: 'VALIDATE_STRATEGY',
          id: localStorage.getItem('id'),
          validationStrategy: {
            validationStrategy: 'EVIDENTE',
            questionarie: {
              cuestionario: this.questionarie.cuestionario,
              registroCuestionario: this.questionarie.registroCuestionario,
              fecha: 'null',
              cliente: {
                tipoDocumento: '1',
                numeroDocumento: '52916207',
                primerNombre: 'null',
                primerApellido: 'null',
                fechaExpedicionDocumento: 'null',
              },
              rtaCuestionario: preguntas,
              preguntas: [],
            },
          },
        };
        this.validationStrategyService.postPreguntasEvidente(data).subscribe({
          next: (resp: any) => {
            if(resp.validationStrategy === 'CREDIT_APPROVED') {
              this.bnplService.creditEmit = resp;
              this.router.navigate(['/summary-credit']);
            }

            if(resp.validationStrategy === 'CREDIT_DENIED') {
              this.mostrarAlerta = 'rechazado';
            }

            if(resp.validationStrategy === 'ERROR') {
              this.mostrarAlerta = 'fallo';
            }
            if(resp.validationStrategy === 'ERROR_IDENTITY_VALIDATION') {
              this.mostrarAlerta = 'fallo';
            }
          },
          error: (e: any) => {
            this.mostrarAlerta = 'fallo';
          },
        });
      }
    }
    
  }

  navigateToClient() {
    window.location.href = this.dataInformation.urlRedirect;
  }


}
