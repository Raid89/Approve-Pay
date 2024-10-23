import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { LoadingScreenService } from '../../shared/components/loading-screen/loading-screen.service';
import { PopUpComponent } from '../../shared/components/pop-up/pop-up.component';
import { IResponseTotales, IDateFilter } from '../../shared/interfaces/history.interface';
import { CoordinatorHistoryService } from '../../core/services/coordinator-history.service';
import { CoordinatorTotalComponent } from './coordinator-total/coordinator-total.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-coordinator-history',
  templateUrl: './coordinator-history.component.html',
  styleUrl: './coordinator-history.component.scss',
  standalone: true,
  imports: [SharedModule, CommonModule, CoordinatorTotalComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class CoordinatorHistoryComponent implements OnInit {

  public range:any = {
    start: '',
    end: ''
  };
  public showHistory: boolean = false;
  public showCalendar: boolean = true;
  public totalEntries!: number;
  public totalAmmountCollection = 0;
  public casheer?: string;

  constructor( 
    private coordinatorHistory: CoordinatorHistoryService,
    private LoadingS: LoadingScreenService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.coordinatorHistory.getCashiers({userId: sessionStorage.getItem('userDocument') || ''}).subscribe();
  }

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

  formatDateToRequets(dateToParse: string){
    return moment(dateToParse).format('YYYYMMDD');
  }

  changeShowCalendar() {
    this.showCalendar = !this.showCalendar
  }

  openErrorPopUp(text: string) { 
    this.dialog.open(PopUpComponent, { data: 
      { 
        popUpText: text,
        buttonText: 'De Acuerdo'
      }})
    this.showHistory = false;
  }

  dataFilter(casheer?: string): IDateFilter {
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
    return dataFilter
  }

  setCashher(casheer: string) { 
    this.casheer = casheer === '' ? undefined : casheer;
    this.searchTotals();
  }

  async searchTotals() {
    try {
      this.LoadingS.loadingScreen = true;
      this.showHistory = false;

      const responseTotals = (await lastValueFrom(this.coordinatorHistory.getTotalsCasheer(this.dataFilter(this.casheer))));
      this.totalAmmountCollection = responseTotals.ammount
      this.totalEntries = responseTotals.end;
      if(this.totalEntries < 1) {
        this.openErrorPopUp('No hay resultados para la busqueda');
        this.LoadingS.loadingScreen = false;
      } 
  
      this.showCalendar = false;
      this.showHistory = true;
      this.LoadingS.loadingScreen = false;
    } catch (error) {
      this.openErrorPopUp('En este momento estamos experimentando incovenientes');
      this.LoadingS.loadingScreen = false;
    }
  }
}
