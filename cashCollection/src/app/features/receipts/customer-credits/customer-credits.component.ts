import { Component, OnInit } from '@angular/core';
import { ReceiptsService } from '../../../core/services/receipts.service';
import { CreditData } from '../../../shared/interfaces/receipt.interface';
import { Router } from '@angular/router';
import { LoadingScreenService } from '../../../shared/components/loading-screen/loading-screen.service';

@Component({
  selector: 'app-customer-credits',
  templateUrl: './customer-credits.component.html',
  styleUrl: './customer-credits.component.scss'
})
export class CustomerCreditsComponent implements OnInit {
  
  public clientCredits!: CreditData[];
  public documentClient: string | null = sessionStorage.getItem('documentClient');
  public totalPaid = 0;

  constructor(
    private receiptService: ReceiptsService,
    private router: Router,
    private loadingScreenS: LoadingScreenService
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
    this.getClientCredits();
  }

  getClientCredits() {
    
    this.loadingScreenS.loadingScreen = true
    const observerSendOtp = {
      next: (response: CreditData[]) => {
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

  calculatedTotalPaid() {
    this.totalPaid = 0;
    this.clientCredits.forEach(credit => {
      if(!credit.selected) return
      switch (credit.typePaid) {
        case '0':
          this.totalPaid = this.totalPaid + credit.saldoCredito
          break;
        case '1':
          this.totalPaid = this.totalPaid + credit.nextPaid
          break;
        case '2':
          this.totalPaid = this.totalPaid + parseInt(credit.otherValue) 
          break;
      }
    })
  }
}
