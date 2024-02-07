import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValidationStrategy } from '../models/validation-strategy-response.model';
import { OtherOtp } from '../models/other-otp.model';

@Injectable({
  providedIn: 'root'
})
export class IdentityvalidationService {

  HttpUrl: any = environment.HttpUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  getValidationStrategy(data: any): Observable<ValidationStrategy> {
    return this.http.post<ValidationStrategy>(`${this.HttpUrl}/IdVal`, data, this.httpOptions); 
  }

  getOtherOtp(data: OtherOtp) {
    return this.http.post(`${this.HttpUrl}/IdVal`, data, this.httpOptions);
  }

  postPreguntasEvidente(data: any) {
    return this.http.post(`${this.HttpUrl}/IdVal`, data, this.httpOptions); //
    
  }
}
