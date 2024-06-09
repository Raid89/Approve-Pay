import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from './components/navbar/user-info/user-info.component';
import { ButtonComponent } from './components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { CurrencyFormatterDirective } from './directives/currency-formatter-directive';
import { MaxValueDirective } from './directives/max-value.directive';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './components/pop-up/pop-up.component';


@NgModule({
  declarations: [
    NavbarComponent,
    UserInfoComponent,
    ButtonComponent,
    ToastComponent,
    LoadingScreenComponent,
    CheckboxComponent,
    SelectComponent,
    CurrencyFormatterDirective,
    MaxValueDirective,
    InfoCardComponent,
    PopUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    NavbarComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ToastComponent,
    HttpClientModule,
    LoadingScreenComponent,
    CheckboxComponent,
    SelectComponent,
    CurrencyFormatterDirective,
    MaxValueDirective,
    InfoCardComponent
  ]
})
export class SharedModule { }
