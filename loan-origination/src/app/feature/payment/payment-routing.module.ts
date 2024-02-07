import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthIdentificationComponent } from './components/auth-identification/auth-identification.component';


const routes: Routes = [
  {
    path: '',
    component: AuthIdentificationComponent
  }
  
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PaymentRoutingModule { }

