import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDateFilter, IResponseTotales } from '../../shared/interfaces/history.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

interface dataFilter {
  startDate: string,
  endDate: string,
  userId: string,
  start?: number,
  end?: number
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private dataFilter!: dataFilter

  constructor( private httpClient: HttpClient) { }

  private getToken(): string {
    return sessionStorage.getItem('userToken') || '';
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getTotalCashierCollections(dateFilter: IDateFilter): Observable<IResponseTotales[]> {
    const route = environment.HttpUrl + '/clientcredits'

    const body = {
      actionStrategyPattern: "GET_TOTALS_CASHIER_COLLECTIONS",
      dateFilter
    }

    this.setDataFilter(dateFilter.startDate, dateFilter.endDate, dateFilter.userId)

    return this.httpClient.post<IResponseTotales[]>(route, body, { headers: this.getHeaders() })
  }

  setDataFilter(startDate: string, endDate: string, userId: string){
    this.dataFilter = {
      startDate,
      endDate,
      userId,
      start: 0,
      end: 0
    }
  }
  
  getCashierCollections(start: number, end: number): Observable<IResponseTotales[]> {
    const route = environment.HttpUrl + '/clientcredits'
    this.dataFilter.start = start;
    this.dataFilter.end = end;

    const body = {
      actionStrategyPattern: "GET_CASHIER_COLLECTIONS",
      dateFilter: this.dataFilter
    }

    return this.httpClient.post<IResponseTotales[]>(route, body, { headers: this.getHeaders() })
  }

}
