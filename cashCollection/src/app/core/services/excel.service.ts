import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ReceiptsService } from './receipts.service';
import { HistoryService } from './history.service';
import { LoadingScreenService } from '../../shared/components/loading-screen/loading-screen.service';
import { ToastService } from '../../shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(
    private historyService: HistoryService,
    private loadingS: LoadingScreenService,
    private toastService: ToastService
  ) {}

  public exportAsExcelFile(totalResults: number): void {
    this.loadingS.loadingScreen = true;
    const observableCashierCollect = {
      next: (response: any[]) => this.createExcel(response),
      error: () => {
        this.toastService.showToast({
          type: 'warning',
          message: 'En este momento estamos experimentando incovenientes, intenta de nuevo'
        })
        this.loadingS.loadingScreen = false;
      }
    }

    this.historyService.getCashierCollections(0, totalResults).subscribe(observableCashierCollect)
  
  }

  transformData(dataArray: any) {
    return dataArray.map((item: any) => {
      const formattedCredits = JSON.parse(item.credits).map((credit: any) => ({
        "ID Crédito": credit.idCredit,
        "Monto": `$${credit.ammount.toFixed(2)}` // Assuming you want to format the amount with two decimals
      }));
  
      return {
        "Fecha de transacción": new Date(item.datehour).toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        "Monto recaudado": `$${item.totalAmmount.toFixed(2)}`,
        "Cédula cliente": item.customer,
        "N° Autorización": item.coreId,
        "Créditos": formattedCredits
      };
    });
  }
  
  createExcel(data: any[]) {
    data = this.transformData(data);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      worksheet.columns = headers.map(header => ({ header, key: header }));
      data.forEach(item => worksheet.addRow(item));
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      saveAs(blob, `history_export_${new Date().getTime()}.xlsx`);
      this.loadingS.loadingScreen = false;
    });
  }
}

