import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { TextBox } from 'src/app/core/shared/models/textbox';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.HttpUrl;

  constructor(private http: HttpClient) { }

  getControlIdentification(){
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

  sendOtp(id: number): Observable<any> {
    const body = {
      actionStrategyPattern: "SEND_OTP_CLIENT",
      identificacion: id,
    }
    return this.http.post(`${this.url}/otplogin`, body);
  }

}
