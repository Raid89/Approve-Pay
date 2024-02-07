import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, Validators, } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GeneralparametersService } from '../../shared/services/generalparameters.service';


import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../shared/services/customer.service';
import { Customer } from '../../shared/models/customer.model';
import { BnplService } from '../../shared/services/bnpl.service';
import { ControlBase } from 'src/app/core/shared/models/control-base';
import { BasicData } from 'src/app/feature/BNPL/shared/models/basicdata.model';
import { ActivityContractor } from '../../shared/models/general-parameters-response.model';
import { FirstStep } from '../../shared/models/first-step.model';


@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.css']
})
export class BasicDataComponent {


  _submitMessage = ''
  generalParameters: any = ""
  basicData!: FormGroup;
  frmStepOne$!: Observable<FormGroup>;
  regexNumbers: any = /^[0-9]*$/;
  regexWords: any = /^[a-zA-Z\s]*$/;
  regexMail: any = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/
  small = 600
  verticalclass = true
  pantalla: any = window.innerWidth
  minDate: any;
  maxDate: any;
  disableButton: boolean = false;
  customerPerson!: Customer;
  clientParameter: string = "";
  controls$: Observable<ControlBase<any>[]>;

  private myFrmStepOne$ = new BehaviorSubject<FormGroup>(this.basicData);
  myFrmStepOneListener$: Observable<FormGroup> = this.myFrmStepOne$.asObservable();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private readonly bnplService: BnplService,
    private readonly route: ActivatedRoute

  ) {
    this.controls$ = this.bnplService.getControlsBasicData();
    
    // this.bnplService.getPersonalInformation(id).subscribe((resp) => {
    //   console.log(resp)
    // })
  }

  getInfoForm(basicData: FirstStep) {
    console.log(basicData);
    this.bnplService.stepsInformation.firstStep = basicData
    this.router.navigate(['/personal-information']);
  }

  ngOnInit(): void {}



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.pantalla = window.innerWidth

    if (this.pantalla < this.small) {
      this.verticalclass = false
    } else {
      this.verticalclass = true
    }
  }

}
