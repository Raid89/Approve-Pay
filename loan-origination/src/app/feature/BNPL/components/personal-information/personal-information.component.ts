import { Component } from '@angular/core';
import { BnplService } from '../../shared/services/bnpl.service';

import { ControlBase } from 'src/app/core/shared/models/control-base';
import { Observable } from 'rxjs';
import { PersonalInformation } from '../../shared/models/personalinformation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent {

  public controlsPersonalInformation$: Observable<ControlBase<any>[]>;


  constructor(
    private readonly bnplService: BnplService,
    private readonly router: Router
  ) {
    this.controlsPersonalInformation$ = this.bnplService.getControlsPersonalInformation();
  }

  getPersonalInformation(personalInformation: PersonalInformation) {
    this.bnplService.stepsInformation.secondStep = personalInformation;
    this.router.navigate(['/selection-fees']);
  }


}
