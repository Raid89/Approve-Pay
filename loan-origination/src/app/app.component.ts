import { Component,ViewChild  } from '@angular/core';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Loan Origination';
  
  routes: string[] = [
    '/',
    '/personal-information',
    '/selection-fees',
    '/confirm-otp'
  ];
  

  getErrorMessage(fieldFormGroup: any) {
    const ERROR = fieldFormGroup.errors;
    let message = '';

    if ((ERROR['required'])) {
      message = 'Campo Obligatorio';
    } else if ((ERROR['email'])) {
      message = 'Debe ingresar una dirección de email válida';
    } else if (
      (ERROR['minlength']) ||
      (ERROR['maxlength']) ||
      (ERROR['pattern'])
    ) {
      message = 'Valor inválido';
    }
    return message;
  }
}
