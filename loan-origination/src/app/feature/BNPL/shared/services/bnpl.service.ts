import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Code } from 'src/app/core/shared/models/code';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { Dropdown } from 'src/app/core/shared/models/dropdown';
import { TextBox } from 'src/app/core/shared/models/textbox';
import {
  ActivityContractor,
  GeneralParameter,
} from '../models/general-parameters-response.model';
import { environment } from 'src/environments/environment';
import { DropdownObject } from 'src/app/core/shared/models/dropdown-object';
import { StepsInformation } from '../models/stepsInformation.model';
import { Parameter } from '../models/parameters.model';
import { Questionarie } from '../models/validation-strategy-response.model';
import { Client } from '../models/client.model';
import { DropdownClient } from 'src/app/core/shared/models/dropdown-clients';
import { Currency } from 'src/app/core/shared/models/currency';
import { NumberInput } from 'src/app/core/shared/models/number';
import { CreditApprobe } from 'src/app/core/shared/models/credit-approbe.model';
import { DocumentsRequest } from '../models/documents-request.model';
import { Document, DocumentResponse } from '../models/documents.model';
import { SignDocument } from '../models/sign-document.model';
import { Payment } from '../models/payment.model';
import { DataInformation } from '../models/data-information.model';
import { DropdownFees } from 'src/app/core/shared/models/dropdown-fees.model';

const initInfo: StepsInformation = {
  firstStep: {
    celular: '',
    numeroDocumento: '',
    tipoDocumento: {
      id: 0,
      description: '',
    },
  },
  secondStep: {
    anio: '',
    dia: '',
    mes: '',
    primerNombre: '',
    primerApellido: '',
    email: '',
  },
  thirdStep: {
    numeroCuotas: '1',
    referenciaPago: '',
    monto: '',
    client: {
      createPowwi: 0,
      id: '',
      maxAmmount: 0,
      maxCreditTerm: 0,
      minAmmount: 0,
      minCreditTerm: 0,
      partnerName: '',
    },
  },
};

const initQuestionarie: Questionarie = {
  cuestionario: '',
  preguntas: [],
  registroCuestionario: '',
  rtaCuestionario: [],
};

const initCredit: CreditApprobe = {
  amountFinance: 0,
  fees: 0,
  fGA: 0,
  platform: 0,
  rateApprobeAnnual: 0,
  rateApprobeMonth: 0,
  validationStrategy: '',
  paid: '',
  cuotaBenefits: 0,
  feesBenefits: 0,
};

const initPayment: Payment = {
  amountFinance: 0,
  fees: 0,
  fGA: 0,
  platform: 0,
  numCredit: '',
  minPaid: '',
  rateApprobeAnnual: 0,
  rateApprobeMonth: 0,
  datePaid: '',
  validationStrategy: '',
  cuotaBenefits: 0,
  feesBenefits: 0,
  paid: '',
};

const initDataInformation: DataInformation = {
  id: '',
  tipoIdentificacion: '',
  identificacion: '',
  primerApellido: '',
  name: '',
  fullName: '',
  celularFormulario: '',
  emailFormulario: '',
  fechaExpedicion: '',
  client: '',
  ammount: 0,
  term: 0,
  validationStrategy: '',
  fechaSolicitud: '',
  referenciaPago: '',
  score: 0,
  feesApprobe: 0,
  rateApprobe: 0,
  approveValue: 0,
  scoreAcierta: 0,
  value: 0,
  valorCuota: 0,
  amountFinance: 0,
  status: '',
  fGA: 0,
  platform: 0,
  autorizacion: {
    data: '',
    name: '',
    pag: 0
  },
  causalRechazo: '',
  pagare: {
    data: '',
    name: '',
    pag: 0
  },
  urlRedirect: '',
  respuesta: '',
  typeIdentification: {
    description: '',
    id: ''
  }
};

@Injectable({
  providedIn: 'root',
})
export class BnplService {
  private _stepsInformation = new BehaviorSubject<StepsInformation>(initInfo);
  private _questionarieEmit = new BehaviorSubject<Questionarie>(
    initQuestionarie
  );
  private _creditEmit = new BehaviorSubject<CreditApprobe>(initCredit);
  private _payment = new BehaviorSubject<Payment>(initPayment);
  private _personalInformation = new BehaviorSubject<DataInformation>(
    initDataInformation
  );

  public get stepsInformation(): StepsInformation {
    return this._stepsInformation.getValue();
  }

  public set stepsInformation(v: StepsInformation) {
    this._stepsInformation.next(v);
  }

  public get questionarieEmit(): Questionarie {
    return this._questionarieEmit.getValue();
  }

  public set questionarieEmit(v: Questionarie) {
    this._questionarieEmit.next(v);
  }

  public get creditEmit(): CreditApprobe {
    return this._creditEmit.getValue();
  }

  public set creditEmit(v: CreditApprobe) {
    this._creditEmit.next(v);
  }

  public get payment(): Payment {
    return this._payment.getValue();
  }

  public set payment(v: Payment) {
    this._payment.next(v);
  }

  public get personalInformation(): DataInformation {
    return this._personalInformation.getValue();
  }

  public set personalInformation(v: DataInformation) {
    this._personalInformation.next(v);
  }

  HttpUrl: any = environment.HttpUrl;
  identifications: Observable<ActivityContractor[]>;
  clients: Observable<Client[]>;

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {
    const data = {
      id: 0,
      httpMethod: 'GET',
    };
    this.identifications = this.selectinformation(data);
    this.clients = this.getClients();
  }

  getPartnerParameters(data: any): Observable<Parameter> {
    return this.http.post<Parameter>(
      `${this.HttpUrl}/partnerParameters`,
      data,
      this.httpOptions
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.post<Client[]>(
      `${this.HttpUrl}/partnerParameters`,
      {},
      this.httpOptions
    );
  }

  selectinformation(data: any): Observable<ActivityContractor[]> {
    return this.http
      .post<GeneralParameter>(
        `${this.HttpUrl}/generalinformation`,
        data,
        this.httpOptions
      )
      .pipe(map((value) => value.identification));
  }

  signDocument(data: SignDocument): Observable<Payment> {
    return this.http.post<Payment>(
      `${this.HttpUrl}/IdVal`,
      data,
      this.httpOptions
    );
  }

  getDocuments(data: DocumentsRequest): Observable<Document[]> {
    return this.http
      .post<DocumentResponse>(`${this.HttpUrl}/IdVal`, data, this.httpOptions)
      .pipe(map((value) => value.documents));
  }

  getPersonalInformation(data: any) {
    return this.http.post(`${this.HttpUrl}/IdVal`, data, this.httpOptions);
  }

  getControlsBasicData() {
    const controls: ControlBase<string>[] = [
      new DropdownObject({
        key: 'tipoDocumento',
        label: 'Tipo de documento',
        optionsObject: this.identifications,
        order: 1,
        valueObject:
          this.personalInformation.typeIdentification,
        value: this.stepsInformation.firstStep.tipoDocumento.description,
        layout: 'col-xs-12 col-sm-12',
        required: true,
      }),
      new TextBox({
        key: 'numeroDocumento',
        label: 'Número de documento',
        value:
          this.personalInformation.identificacion ||
          this.stepsInformation.firstStep.numeroDocumento,
        required: true,
        maxLength: 11,
        pattern: '^[0-9]*$',
        layout: 'col-xs-12 col-md-12',
        order: 2,
      }),
      new TextBox({
        key: 'celular',
        label: 'Celular',
        value:
          this.personalInformation.celularFormulario ||
          this.stepsInformation.firstStep.celular,
        minLength: 10,
        maxLength: 11,
        required: true,
        pattern: '^[0-9]*$',
        layout: 'col-xs-12 col-md-12',
        order: 3,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getControlsPersonalInformation() {
    const controls: ControlBase<string>[] = [
      new TextBox({
        key: 'primerNombre',
        label: 'Primer nombre',
        value:
          this.personalInformation.name ||
          this.stepsInformation.secondStep.primerNombre,
        required: true,
        pattern: '^[a-zA-Zs]*$',
        layout: 'col-md-12',
        order: 1,
      }),
      new TextBox({
        key: 'primerApellido',
        label: 'Primer apellido',
        value:
          this.personalInformation.primerApellido ||
          this.stepsInformation.secondStep.primerApellido,
        required: true,
        layout: 'col-md-12',
        pattern: '^[a-zA-Zs]*$',
        maxLength: 14,
        order: 2,
      }),
      new NumberInput({
        key: 'dia',
        label: 'Día',
        type: 'number',
        value: this.personalInformation.fechaExpedicion
          ? this.personalInformation.fechaExpedicion.split('/')[0]
          : this.stepsInformation.secondStep.dia,
        required: true,
        minLength: 1,
        maxLength: 2,
        min: 1,
        max: 31,
        isDay: true,
        layout: 'col w-100',
        pattern: '^[0-9]*$',
        title: 'Fecha de expedición del documento',
        order: 3,
      }),
      new NumberInput({
        key: 'mes',
        label: 'Mes',
        type: 'number',
        value: this.personalInformation.fechaExpedicion
          ? this.personalInformation.fechaExpedicion.split('/')[1]
          : this.stepsInformation.secondStep.mes,
        required: true,
        minLength: 1,
        maxLength: 2,
        min: 1,
        max: 12,
        isMonth: true,
        layout: 'col w-100 align-self-end',
        pattern: '^[0-9]*$',
        title: '',
        order: 4,
      }),
      new TextBox({
        key: 'anio',
        label: 'Año',
        value: this.personalInformation.fechaExpedicion
          ? this.personalInformation.fechaExpedicion.split('/')[2]
          : this.stepsInformation.secondStep.anio,
        required: true,
        maxLength: 4,
        layout: 'col w-100 align-self-end',
        title: '',
        pattern: '^[0-9]*$',
        order: 5,
      }),
      new TextBox({
        key: 'email',
        label: 'E-mail',
        value:
          this.personalInformation.emailFormulario ||
          this.stepsInformation.secondStep.email,
        required: true,
        layout: 'col-md-12',
        title: '',
        maxLength: 35,
        pattern: /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        order: 6,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getSelectionFeesControls(arrayFees: number[]) {
    const controls: ControlBase<string>[] = [
      new DropdownClient({
        key: 'client',
        label: 'Selecciona una opción',
        optionsObject: this.clients,
        required: true,
        title: 'Elige un cliente',
        layout: 'col-md-12',
        order: 1,
      }),
      new Dropdown({
        key: 'numeroCuotas',
        label: 'Selecciona una opción',
        options: arrayFees.map((fees) => {
          return {
            key: fees.toString(),
            value: fees.toString(),
          };
        }),
        required: true,
        value: this.stepsInformation.thirdStep.numeroCuotas ,
        title: '¿A cuantas cuotas quieres pagar la compra?',
        layout: 'col-md-12',
        order: 2,
      }),
      new Currency({
        key: 'monto',
        label: 'Valor de compra',
        value: this.stepsInformation.thirdStep.monto,
        required: true,
        title: 'Ingresa el valor de compra',
        pattern: '^[0-9]*$',
        layout: 'col-xs-12 col-md-12',
        order: 3,
      }),
      new TextBox({
        key: 'referenciaPago',
        label: 'Numero de referencia de pago',
        value: this.stepsInformation.thirdStep.referenciaPago,
        required: true,
        title: 'Ingresa la referencia de pago',
        layout: 'col-xs-12 col-md-12',
        order: 4,
        maxLength: 32,
        pattern: /^[a-zA-Z0-9]+$/,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getSelectionFeesControlsWithRef(arrayFees: number[]) {
    console.log(arrayFees);
    console.log(this.personalInformation.term);
    const controls: ControlBase<string>[] = [
      new DropdownFees({
        key: 'numeroCuotas',
        label: 'Selecciona una opción',
        options: arrayFees.map((fees) => {
          return {
            key: fees.toString(),
            value: fees.toString(),
          };
        }),
        required: true,
        value: this.personalInformation.term.toString(),
        title: '¿A cuántas cuotas quieres pagar la compra?',
        layout: 'col-md-12',
        order: 1,
      }),
    ];
    console.log(controls);
    return of(controls.sort((a, b) => a.order - b.order));
  }

  getOtpControls() {
    const controls: ControlBase<string>[] = [
      new Code({
        key: 'otp',
        label: 'otp',
        value: '',
        required: true,
        layout: 'col-md-12',
        maxLength: 4,
        title: 'Ingresa el código',
        pattern: '^[0-9]*$',
        order: 6,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }
}
