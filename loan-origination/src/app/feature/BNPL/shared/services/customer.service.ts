import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Partner } from '../models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customer!:Customer;
  partner!:Partner;

  constructor() { }

  getcustomer() {
    return this.customer;
  }

  setcustomer(pCustomer:Customer){
    this.customer=pCustomer;
  }

  getpartner(){
    return this.partner;
  }

  setpartner(pPartner:Partner){
    this.partner=pPartner;
  }
}
