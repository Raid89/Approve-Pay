import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, NgForm, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../shared/models/customer.model';
import { Validationstrategy } from '../../shared/models/validationstrategy.model';
import { CustomerService } from '../../shared/services/customer.service';
import { IdentityvalidationService } from '../../shared/services/identityvalidation.service';
import { BnplService } from '../../shared/services/bnpl.service';
import { Questionarie } from '../../shared/models/validation-strategy-response.model';
import { StepsInformation } from '../../shared/models/stepsInformation.model';
import Swal from 'sweetalert2';
import { DataInformation } from '../../shared/models/data-information.model';

@Component({
  selector: 'app-identity-validation',
  templateUrl: './identity-validation.component.html',
  styleUrls: ['./identity-validation.component.css'],
})
export class IdentityValidationComponent {
  customerPerson!: Customer;
  validationStrategy!: Validationstrategy;
  reconocer = false;
  evidente = false;
  startmessage = true;
  verticalclass = true;
  pantalla: any = window.innerWidth;
  small = 600;
  identityValidationForm!: FormGroup;
  regexNumbers: any = /^[0-9]*$/;

  //evidente
  preguntas: any | null = null;
  itemSelect = true;
  paso = 0;
  respuestaSelect: any;
  ArrayPreguntasSelect: any[] = [];
  clientInformation: StepsInformation;

  questionarie: Questionarie;
  dataInformation: DataInformation

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private customer: CustomerService,
    private router: Router,
    private validationStrategyService: IdentityvalidationService,
    private readonly bnplService: BnplService
  ) {
    this.questionarie = this.bnplService.questionarieEmit;
    this.preguntas = this.bnplService.questionarieEmit.preguntas;
    this.clientInformation = this.bnplService.stepsInformation;
    this.dataInformation = this.bnplService.personalInformation
    console.log(this.clientInformation)
  }

  ngOnInit() {
    Swal.close();
    // this.getValidationStrategy();
  }

  navegarAlert() {
    debugger;
    this.ArrayPreguntasSelect.push(this.respuestaSelect);
    localStorage.setItem('preguntas', JSON.stringify(this.ArrayPreguntasSelect));
    this.router.navigate(['/await-alert', 'evidente']);
  }

  getValidationStrategy() {
    let data = {
      tipoIdentificacion: '1',
      identificacion: '52916207',
      primerApellido: 'padilla',
      name: 'laura',
      fullName: 'laura padilla',
      celularFormulario: '31962978099',
      emailFormulario: 'lauracpadillam84@gmail.com',
      fechaExpedicion: '24/09/2002',
      client: 'ABE',
    };
    this.validationStrategyService.getValidationStrategy(data).subscribe({
      next: (x: any) => {
        //Swal.close()
        this.validationStrategy = x;
        console.log(this.validationStrategy);
        console.log(this.validationStrategy.questionarie);
        console.log(this.validationStrategy.questionarie.preguntas);
        this.preguntas = this.validationStrategy.questionarie.preguntas;
        console.log(this.preguntas);
        if (this.validationStrategy.validationStrategy == 'EVIDENTE') {
          this.preguntas = this.validationStrategy.questionarie.preguntas;
          this.evidente = true;
          this.reconocer = false;
          this.startmessage = false;
        } else if (this.validationStrategy.validationStrategy == 'RECONOCER') {
          this.reconocer = true;
          this.evidente = false;
          this.startmessage = false;
        } else {
          //error

          this.reconocer = false;
          this.evidente = false;
          this.startmessage = true;
        }
      },
      error: (error) => {
        //Swal.close()
        window.location.href = this.dataInformation.urlRedirect;
        setTimeout(() => {
          //this.alertCustomError("Error al cargar parametros de formulario")
          //this.router.navigateByUrl('/inicio/home')
        }, 10);
      },
    });
  }

  validationIdReconocer() {
    let data = {
      tipoIdentificacion: '1',
      identificacion: '52916207',
      primerApellido: 'padilla',
      name: 'laura',
      celularFormulario: '3196297809',
      emailFormulario: 'lauracpadillam84@gmail.com',
      otp: '123456',
      client: this.customerPerson.partner,
    };

    if (!this.identityValidationForm.invalid) {
      setTimeout(() => {
        window.scroll(0, 0);
      }, 10);

      //call OTP validation

      //this.router.navigate(['identityvalidation']);
    }
  }

  seleccionarPregunta(_ordenPregunta: number, _ordenRespuesta: number) {
    this.respuestaSelect = {
      ordenPregunta: _ordenPregunta,
      ordenRespuesta: _ordenRespuesta,
    };  
    this.itemSelect = false;
  }
  
  siguiente() {
    this.ArrayPreguntasSelect.push(this.respuestaSelect);
    localStorage.setItem('preguntas', JSON.stringify(this.ArrayPreguntasSelect));
    this.respuestaSelect = null;
    this.itemSelect = true;
    this.paso++;
  }

  fin() {
    this.ArrayPreguntasSelect.push(this.respuestaSelect);

    let data = {
      cuestionario: this.validationStrategy.questionarie.cuestionario,
      registroCuestionario:
        this.validationStrategy.questionarie.registroCuestionario,
      cliente: {
        numeroDocumento: this.customer.getcustomer().idType,
        tipoDocumento: this.customer.getcustomer().idPerson,
      },
      rtaCuestionario: this.ArrayPreguntasSelect,
    };
    console.log(data);
    this.validationStrategyService.postPreguntasEvidente(data).subscribe({
      next: (resp: any) => {
        console.log(resp);
        if (resp) {
        } else {
        }
      },
      error: (e: any) => {},
    });
  }
  getErrorMessage(fieldFormGroup: any) {
    const ERROR = fieldFormGroup.errors;
    let message = '';

    if (ERROR['required']) {
      message = 'Campo Obligatorio';
    } else if (ERROR['email']) {
      message = 'Debe ingresar una dirección de email válida';
    } else if (ERROR['minlength'] || ERROR['maxlength'] || ERROR['pattern']) {
      message = 'Valor inválido';
    }
    return message;
  }
}
