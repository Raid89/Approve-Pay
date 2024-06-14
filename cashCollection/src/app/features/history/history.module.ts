import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HistoryInfoComponent } from './history-info/history-info.component';
import { HistoryTotalComponent } from './history-total/history-total.component';


@NgModule({
  declarations: [
    HistoryInfoComponent,
    HistoryTotalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
  ],
  exports: [
    HistoryInfoComponent,
    HistoryTotalComponent
  ]
})
export class HistoryModule { }
