import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { Partner } from '../model/partner';
import { CustomerService } from '../services/customer.service';
import { GeneralparametersService } from '../services/generalparameters.service';

@Component({
  selector: 'app-credit-data',
  templateUrl: './credit-data.component.html',
  styleUrls: ['./credit-data.component.css']
})
export class CreditDataComponent {


  customerPerson!: Customer;
  partner!: Partner;
  private customer!: CustomerService;
  private router!: Router;
  creditData!: FormGroup;
  private formBuilder!: FormBuilder;
  regexNumbers: any = /^[0-9]*$/;
  small = 600
  verticalclass = true
  pantalla: any = window.innerWidth

  constructor(

    private cusotmer: CustomerService,

  ) {

    this.customerPerson = this.customer.getcustomer();
    this.partner = this.customer.getpartner();
    if (this.customerPerson == null) {
      this.router.navigate(['basicdata']);
    }
    this.creditData = this.formBuilder.group({
      plazo: ["", [Validators.required, Validators.pattern(this.regexNumbers), Validators.min(this.partner.minCreditTerm), Validators.max(this.partner.maxCreditTerm)]],
      monto: ["", [Validators.required, Validators.pattern(this.regexNumbers), Validators.min(this.partner.minAmmount), Validators.max(this.partner.maxAmmount)]],

    });

  }

  ngOnInit() {

  }


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


  validationId() {

    if (!this.creditData.invalid) {
      setTimeout(() => {
        window.scroll(0, 0)
      }, 10);

      this.customerPerson.ammount= this.creditData.value.monto;
      this.customerPerson.term=this.creditData.value.plazo
      this.cusotmer.setcustomer(this.customerPerson);
      this.router.navigate(['identityvalidation']);

    }

  }

}
