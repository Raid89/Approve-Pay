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
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
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
    MaxValueDirective
  ]
})
export class SharedModule { }
