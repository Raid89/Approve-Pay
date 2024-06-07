import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditData } from '../../shared/interfaces/receipt.interface';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptsService {

  public creditsData$ = new BehaviorSubject<CreditData[]>([]);

  public set creditsData(creditsData: CreditData[]) {
    this.creditsData$.next(creditsData);
  }

  public get creditsData(): CreditData[]{
    return this.creditsData$.getValue()
  }

  constructor(private httpClient: HttpClient) { }

  private getToken(): string {
    return sessionStorage.getItem('userToken') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getClientCredits(identificacion: string | null): Observable<CreditData[]> {
    const route = environment.HttpUrl + '/clientcredits'
    const body = {
      actionStrategyPattern: 'GET_CLIENT_CREDITS',
      identificacion
    }
    return this.httpClient.post<CreditData[]>(route, body,  { headers: this.getHeaders() });
  }
}
