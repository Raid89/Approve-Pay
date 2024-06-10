import { Component, OnInit } from '@angular/core';
import { ReceiptsService } from '../../../core/services/receipts.service';
import { CreditData } from '../../../shared/interfaces/receipt.interface';
import { Router } from '@angular/router';
import { LoadingScreenService } from '../../../shared/components/loading-screen/loading-screen.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../shared/components/pop-up/pop-up.component';
import { IFinancialData } from '../../../shared/interfaces/auth.interfaces';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-customer-credits',
  templateUrl: './customer-credits.component.html',
  styleUrl: './customer-credits.component.scss',
  providers: [CurrencyPipe]
})
export class CustomerCreditsComponent implements OnInit {
  
  public clientCredits!: CreditData[];
  public documentClient: string | null = sessionStorage.getItem('documentClient');
  public totalPaid = 0;
  public creditsSelected: CreditData[] = [];
  public showSummaryPayment: boolean = false;

  constructor(
    private receiptService: ReceiptsService,
    private router: Router,
    private loadingScreenS: LoadingScreenService,
    private dialog: MatDialog,
    private currencyPipe: CurrencyPipe,
    private loadScreenS: LoadingScreenService,
  ){

  }

  ngOnInit(): void {
      this.clientCredits = this.receiptService.creditsData;
      if(this.clientCredits.length < 1) this.validateDocumentStoraged();
  }

  loadClientCredits() {
    this.clientCredits = this.receiptService.creditsData;
  }

  validateDocumentStoraged(): any {
    if( !this.documentClient ) return this.router.navigate(['/receipts/search']);
    setTimeout(() => this.getClientCredits(), 0)
    
  }

  getClientCredits() {
    
    this.loadingScreenS.loadingScreen = true
    const observerSendOtp = {
      next: (response: CreditData[]) => {
        if( response.length < 1 ){
          const dialog = this.dialog.open(PopUpComponent, { data: { 
            popUpText: 'El cliente no tiene créditos activos',
            buttonText: 'Volver'
          }});
          dialog.afterClosed().subscribe(() => this.router.navigate(['/receipts/search']))
        } 
        this.loadingScreenS.loadingScreen = false;
        this.receiptService.creditsData = response;
        this.loadClientCredits();
      },

      error: (err: any) => {
        this.loadingScreenS.loadingScreen = false;
        if(err.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['']);
        }else {
          this.router.navigate(['/receipts/search']);
        }
      }
    }

    this.receiptService.getClientCredits(this.documentClient).subscribe(observerSendOtp)
  }

  updateCreditsSelected() {
    this.clientCredits.forEach((credit) => {
      if(!credit.selected || this.creditsSelected.includes(credit)) this.removeCredit(credit.id);
      if(credit.selected) this.creditsSelected.push(credit);
    })
    this.calculatedTotalPaid();
  }

  removeCredit(creditToRemove: string) {
    this.creditsSelected = this.creditsSelected.filter(credit => credit.id !== creditToRemove);
  }

  calculatedTotalPaid() {
    this.totalPaid = 0;
    this.creditsSelected.forEach((credit, index) => {
      switch (credit.typePaid) {
        case '0':
          this.totalPaid = this.totalPaid + credit.saldoCredito;
          this.creditsSelected[index].valueToSend = credit.saldoCredito;
          break;
        case '1':
          this.totalPaid = this.totalPaid + credit.nextPaid;
          this.creditsSelected[index].valueToSend = credit.nextPaid;
          break;
        case '2':
          this.totalPaid = this.totalPaid + parseInt(credit.otherValue);
          this.creditsSelected[index].valueToSend = parseInt(credit.otherValue);
          break;
      }
    })
  }

  printSummary(): void {
    let printContents = document.getElementById('payment-summary')?.innerHTML;
    if (printContents) {
      let originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      this.router
      location.reload();
    }
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'USD', 'symbol', '1.0-0') || '';
  }

  mapDataShowSummary(credit: CreditData): {label: string, value: string}[] {
    const dataToSummary = [
      { label: 'Valor de cuota', value: this.formatCurrency(credit.nextPaid) },
      { label: 'Monto', value: this.formatCurrency(credit.valueToSend) },
      { label: 'Número de autorización', value: '12345' }
    ]
    return dataToSummary
  }

  sendPayment(){
    this.loadScreenS.loadingScreen = true;
    const observableSendPayment = {
      next: (response: IFinancialData) => {
        this.loadScreenS.loadingScreen = false;
        if(response.validationStrategy !== "SUCCESS") {
          this.dialog.open(PopUpComponent, { data: 
            { 
              popUpText: 'El pago no se pudo <b>realizar</b>',
              buttonText: 'Ir a los créditos'
            }
          })
          return
        }
        this.showSummaryPayment = true;
      },
      error: () => {
        this.loadScreenS.loadingScreen = false;
        this.dialog.open(PopUpComponent, { data: 
          { 
            popUpText: 'El pago no se pudo <b>realizar</b>',
            buttonText: 'Ir a los créditos'
          }})
      }
    }
    this.receiptService.sendPayment(this.creditsSelected, this.totalPaid).subscribe(observableSendPayment);
  }
}
