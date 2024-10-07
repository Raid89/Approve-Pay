import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFinancialData, IUserValidData } from '../../shared/interfaces/auth.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private secretKey = 'approbe-data-key';

  public userData$ = new BehaviorSubject<IFinancialData | null>(null);

  public set userData(userData: IFinancialData | null) {
    this.storeData('userData', userData);
    this.userData$.next(userData);
  }

  public get userData(): IFinancialData | null{
    const userData = this.userData$.getValue();

    if(userData === null) {
      this.userData = this.retrieveData('userData');
    }
    
    return this.userData$.getValue()
  }

  constructor(private httpClient: HttpClient) { }

  encryptData(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decryptData(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  storeData(key: string, value: IFinancialData | null): void {
    const jsonData = JSON.stringify(value);
    const encryptedData = this.encryptData(jsonData);
    sessionStorage.setItem(key, encryptedData);
  }

  retrieveData(key: string): IFinancialData | null {
    const encryptedData = sessionStorage.getItem(key);
    if (encryptedData) {
      const decryptedData = this.decryptData(encryptedData);
      return JSON.parse(decryptedData);
    }
    return null;
  }

  sendOptCode(identificacion: string | null): Observable<IFinancialData> {
    const route = environment.HttpUrl + '/otplogin'
    const body = {
      actionStrategyPattern: 'SEND_OTP_USER',
      identificacion
    }
    return this.httpClient.post<IFinancialData>(route, body);
  }

  validateOtpCode(otp: string): Observable<IUserValidData> {
    const route = environment.HttpUrl + '/otplogin'
    const body = {
      actionStrategyPattern: 'CONFIRM_USER_OTP',
      otp,
      identificacion: sessionStorage.getItem('userDocument')
    }
    return this.httpClient.post<IUserValidData>(route, body);
  }
}
