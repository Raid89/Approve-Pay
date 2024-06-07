import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CreditData } from '../../../../shared/interfaces/receipt.interface';

@Component({
  selector: 'app-table-credits',
  templateUrl: './table-credits.component.html',
  styleUrl: './table-credits.component.scss'
})
export class TableCreditsComponent {
  @Input() creditsData!: CreditData[];
  @Output() changeValues = new EventEmitter();

  public isSmall = false;
  public selectOptions: { value: string, label: string }[] = [
    {
      value: '0',
      label: 'Total'
    },
    {
      value: '1',
      label: 'Mínimo'
    },
    {
      value: '2',
      label: 'Otro valor'
    },
  ]

  constructor() {
    this.setResolution();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setResolution();
  }

  private setResolution(): void {
    this.isSmall = window.innerWidth < 728;
  }

  selectTypePaid(creditIndex: number, value: string) {
    this.creditsData[creditIndex].typePaid = value
    this.changeValues.emit()
  }

  selectCredit(creditIndex: number, value: boolean) {
    this.creditsData[creditIndex].selected = value;
    this.changeValues.emit()
  }

  setOtherValue(creditIndex: number, value: any) {
    this.creditsData[creditIndex].otherValue = value.rawValue;
    this.changeValues.emit()
  }

  changeSelectAll(value: boolean) {
    this.creditsData.forEach((item: any, creditIndex: number) => {
      this.creditsData[creditIndex].selected = value
    })
  }
}
