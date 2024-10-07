import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditData, ICashPayment, IClientCredit, ITransaction } from '../../shared/interfaces/receipt.interface';
import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

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
    return this.httpClient.post<CreditData[]>(route, body, { headers: this.getHeaders() }).pipe(
      map((credits: CreditData[]) => {
        if (credits.length === 0) {
          return credits;
        }
      
        const firstEntry = credits[0];
        const { client } = firstEntry;
      
        const parseDate = (dateString: string): Date => {
          const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
          return new Date(year, month - 1, day);
        };
      
        const filteredCredits = credits.filter(credit => credit.saldoCredito > 0);
      
        if (filteredCredits.length > 0) {
          filteredCredits.sort((a, b) => parseDate(a.nextFeesDate).getTime() - parseDate(b.nextFeesDate).getTime());
      

          filteredCredits[0] = { ...filteredCredits[0], client };
        }
      
        return filteredCredits;
      })
    );
  }

  mapWLstCredits(arrCredits: CreditData[]): IClientCredit[] {
    let wLstCredits: IClientCredit[] = [];
    arrCredits.forEach(credit => {
      let clientCredit: IClientCredit = {
        idCredit: '',
        ammount: 0
      }; 
      clientCredit.idCredit = credit.id;
      clientCredit.ammount = credit.valueToSend;
      wLstCredits.push(clientCredit)
    })
    return wLstCredits;
  }

  initSendPayment(arrCredits: CreditData[], totalAmmount: number): ITransaction {
    const wLstCredits = this.mapWLstCredits(arrCredits);
    const documentClient = sessionStorage.getItem('documentClient') || '';
    const documentCasheer = sessionStorage.getItem('userDocument') || '';

    const cashPayment: ICashPayment = {
      casheer: {
        id: documentCasheer
      },
      customer: documentClient,
      wLstCredits,
      totalAmmount
    };

    const transaction = {
      actionStrategyPattern: "SET_CASH_PAYMENT",
      cashPayment
    }

    return transaction
  }

  sendPayment(arrCredits: CreditData[], totalAmmount: number): Observable<any> {
    const route = environment.HttpUrl + '/clientcredits'
    const body = this.initSendPayment(arrCredits, totalAmmount);
    return this.httpClient.post(route, body, { headers: this.getHeaders() })
  }
}
