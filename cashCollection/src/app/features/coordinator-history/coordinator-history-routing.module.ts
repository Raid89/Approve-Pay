import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordinatorHistoryComponent } from './coordinator-history.component';

const routes: Routes = [
  { path: '', component: CoordinatorHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorHistoryRoutingModule { }
