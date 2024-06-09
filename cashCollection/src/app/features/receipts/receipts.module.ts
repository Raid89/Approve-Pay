import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptsRoutingModule } from './receipts-routing.module';
import { SearchClientComponent } from './search-client/search-client.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerCreditsComponent } from './customer-credits/customer-credits.component';
import { TableCreditsComponent } from './customer-credits/table-credits/table-credits.component';
import { PaymentSummaryComponent } from './payment-summary/payment-summary.component';


@NgModule({
  declarations: [
    SearchClientComponent,
    CustomerCreditsComponent,
    TableCreditsComponent,
    PaymentSummaryComponent,
  ],
  imports: [
    CommonModule,
    ReceiptsRoutingModule,
    SharedModule,
  ]
})
export class ReceiptsModule { }
