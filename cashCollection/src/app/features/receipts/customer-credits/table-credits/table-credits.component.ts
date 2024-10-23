import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreditData } from '../../../../shared/interfaces/receipt.interface';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../../../shared/components/pop-up/pop-up.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-table-credits',
  templateUrl: './table-credits.component.html',
  styleUrl: './table-credits.component.scss'
})
export class TableCreditsComponent implements OnInit {
  @Input() creditsData!: CreditData[];
  @Output() changeValues = new EventEmitter();

  public isSmall = false;

  constructor( private dialog: MatDialog) {
    this.setResolution();
  }

  ngOnInit(): void {
    this.creditsData.forEach((item: CreditData) => item.showPayments = false)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setResolution();
  }

  toggleDetails(index: number, type: 'payments' | 'details'): void {
    if(type === 'payments') {
      this.creditsData[index].showPayments = !this.creditsData[index].showPayments;
      this.creditsData[index].showDetails = false;
    } else if(type === 'details') {
      this.creditsData[index].showDetails = !this.creditsData[index].showDetails;
      this.creditsData[index].showPayments = false;
    } 
  }

  private setResolution(): void {
    this.isSmall = window.innerWidth < 768;
  }

  selectTypePaid(creditIndex: number, value: string) {
    this.creditsData[creditIndex].typePaid = value
    this.changeValues.emit()
  }

  selectCredit(creditIndex: number, value: boolean) {
    if(this.creditsData[creditIndex].saldoCredito < 100) {
      this.dialog.open(PopUpComponent, {data: { 
        popUpText: 'El monto minimo a pagar debe ser superior a $100',
        buttonText: 'Ir a los créditos'
      }})
      return
    }
    if(value === false) this.creditsData[creditIndex].otherValue = '0'
    this.creditsData[creditIndex].selected = value;
    this.changeValues.emit(this.creditsData[creditIndex])
  }

  setOtherValue(creditIndex: number, value: any) {
    if(value.rawValue < 100) value.rawValue = 100;
    this.creditsData[creditIndex].otherValue = value.rawValue;
    this.changeValues.emit()
  }

  changeSelectAll(value: boolean) {
    this.creditsData.forEach((item: any, creditIndex: number) => {
      this.creditsData[creditIndex].selected = value
    })
  }

  isDatePast(dateString: string): boolean {
    const [day, month, year] = dateString.split('/').map(part => parseInt(part, 10));
    const dateToCompare = new Date(year, month - 1, day); 
  
    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);
  
    return dateToCompare < currentDate;
  }

  updOptionsByNextPaid(nextPaid: number){
    const selectOptions = [
      {
        value: '0',
        label: 'Total'
      },
      {
        value: '2',
        label: 'Otro valor'
      },
    ]

    const elementToAdd = {
      value: '1',
      label: 'Mínimo'
    };

    if(nextPaid > 100) selectOptions.splice(1, 0, elementToAdd);

    return selectOptions
  }

  getImageUrl(comercio: string) {
    return `${environment.imagePath}/${comercio}.png`
  }
  
  sortPaymentsByDate(payments: any[]): any[] {
    return payments.sort((a, b) => new Date(b.effective_date).getTime() - new Date(a.effective_date).getTime());
  }
}
