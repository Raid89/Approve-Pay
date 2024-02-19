import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { TextBox } from 'src/app/core/shared/models/textbox';
import { environment } from 'src/environments/environment';
import { OtpResponse } from '../models/otpResponse.model';
import { Credit } from '../models/credit.model';


const credit: Credit = {
  id: '',
  client: '',
  creditType: '',
  saldoCredito: 0,
  nextPaid: 0,
  nextFeesDate: '',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _document = new BehaviorSubject<string>('');
  private _credit = new BehaviorSubject<Credit>(credit);

  private url = environment.HttpUrl;

  constructor(private http: HttpClient) {}

  public get document(): string {
    return this._document.getValue();
  }

  public set document(value: string) {
    this._document.next(value);
  }

  public get credit(): Credit {
    return this._credit.getValue();
  }

  public set credit(value: Credit) {
    this._credit.next(value);
  }

  getControlIdentification() {
    const controls: ControlBase<string>[] = [
      new TextBox({
        key: 'numeroDocumento',
        label: '# de identificación',
        value: '',
        required: true,
        maxLength: 11,
        pattern: '^[0-9]*$',
        layout: 'col-xs-12 col-md-12',
        order: 2,
      }),
    ];
    return of(controls.sort((a, b) => a.order - b.order));
  }

  sendOtp(id: string): Observable<any> {
    const body = {
      actionStrategyPattern: 'SEND_OTP_CLIENT',
      identificacion: id,
    };
    return this.http.post(`${this.url}/otplogin`, body);
  }

  validateOtp(otp: string, id: string): Observable<OtpResponse> {
    const body = {
      actionStrategyPattern: 'CONFIRM_OTP',
      identificacion: id,
      otp: otp,
    };
    return this.http.post<OtpResponse>(`${this.url}/otplogin`, body);
  }

  getCredits(document: string): Observable<Credit[]> {
    const body = {
      actionStrategyPattern: 'GET_CLIENT_CREDITS',
      identificacion: document,
    };
    const token = localStorage.getItem('token');
    return this.http.post<Credit[]>(`${this.url}/clientcredits`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  payCredit(idCredit: string): Observable<any> {
    const body = {
      operation: 'DISPERSION',
      creditoId: idCredit,
    };
    const token = localStorage.getItem('token');
    return this.http.post(`${this.url}/payments`, { body }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
