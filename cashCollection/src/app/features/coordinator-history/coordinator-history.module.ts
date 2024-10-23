import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorHistoryRoutingModule } from './coordinator-history-routing.module';
import { CoordinatorInfoComponent } from './coordinator-info/coordinator-info.component';
import { CoordinatorTotalComponent } from './coordinator-total/coordinator-total.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoordinatorHistoryRoutingModule,
    SharedModule,
  ],
  exports: [
  ]
})
export class CoordinatorHistoryModule { }
