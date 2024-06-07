import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuHomeComponent } from './menu-home/menu-home.component';

const routes: Routes = [
  { path: '', component: MenuHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
