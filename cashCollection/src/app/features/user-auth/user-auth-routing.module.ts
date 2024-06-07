import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
import { ValidateOtpComponent } from './validate-otp/validate-otp.component';

const routes: Routes = [
  { path: '', redirectTo: 'send', pathMatch: 'full' },
  { path: 'send', component: GenerateOtpComponent },
  { path: 'validate', component: ValidateOtpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule { }
