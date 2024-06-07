import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchClientComponent } from './search-client/search-client.component';
import { CustomerCreditsComponent } from './customer-credits/customer-credits.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchClientComponent },
  { path: 'customer-info', component: CustomerCreditsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptsRoutingModule { }
