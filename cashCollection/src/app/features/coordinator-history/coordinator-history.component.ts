import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { LoadingScreenService } from '../../shared/components/loading-screen/loading-screen.service';
import { PopUpComponent } from '../../shared/components/pop-up/pop-up.component';
import { IResponseTotales, IDateFilter } from '../../shared/interfaces/history.interface';
import { CoordinatorHistoryService } from '../../core/services/coordinator-history.service';
import { CoordinatorTotalComponent } from './coordinator-total/coordinator-total.component';

@Component({
  selector: 'app-coordinator-history',
  templateUrl: './coordinator-history.component.html',
  styleUrl: './coordinator-history.component.scss',
  standalone: true,
  imports: [SharedModule, CommonModule, CoordinatorTotalComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class CoordinatorHistoryComponent {

  public range:any = {
    start: '',
    end: ''
  };
  public showHistory: boolean = false;
  public showCalendar: boolean = true;
  public totalCollection!: IResponseTotales[];
  public totalAmmountCollection = 0;

  constructor( 
    private coordinatorHistory: CoordinatorHistoryService,
    private LoadingS: LoadingScreenService,
    private dialog: MatDialog
  ) {}

  setDateRange(dateRange: any) {
    this.range = dateRange;
    this.formatDateToRequets(this.range.start)
  } 

  formatDate(dateToParse: string): string {
    if(dateToParse === '') return 'Seleccionar ';
    const days = ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const date = new Date((dateToParse))
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${dayName} ${day} ${month}`;
  }

  extractStringInsideParentheses(input: string): string | Date {
    const regex = /\(([^)]+)\)/;
    const match = regex.exec(input);
    return match ? match[1] : new Date();
  }

  formatDateToRequets(dateToParse: string){
    return moment(dateToParse).format('YYYYMMDD');
  }

  changeShowCalendar() {
    this.showCalendar = !this.showCalendar
  }

  calculatedTotalAmmount() {
    this.totalCollection.forEach(item => {
      this.totalAmmountCollection += item.ammount;
    })
  }

  searchTotals(casheer?: string) {
    this.LoadingS.loadingScreen = true;
    const startDate = this.formatDateToRequets(this.range.start);
    const endDate = this.formatDateToRequets(this.range.end);
    const userId = sessionStorage.getItem('userDocument') || '';
    const dataFilter: IDateFilter = {
      startDate,
      endDate,
      userId,
      start: 0,
      end: 100,
      casheer
    };

    const observerTotal = {
      next: (response: IResponseTotales[]) => { 
        this.LoadingS.loadingScreen = false; 
        if(response.length < 1) {
          this.dialog.open(PopUpComponent, { data: 
          { 
            popUpText: 'No hay resultados para la busqueda',
            buttonText: 'De Acuerdo'
          }})
          this.showHistory = false;
          return
        }
        this.showCalendar = false;
        this.totalCollection = response;
        this.calculatedTotalAmmount()
        this.showHistory = true;
        },
      error: (err: any) => { 
        this.dialog.open(PopUpComponent, { data: 
          { 
            popUpText: 'En este momento estamos experimentando incovenientes',
            buttonText: 'De Acuerdo'
          }})
      }
    };

    this.coordinatorHistory.getTotalsCasheer(dataFilter).subscribe(observerTotal);
  }
}
