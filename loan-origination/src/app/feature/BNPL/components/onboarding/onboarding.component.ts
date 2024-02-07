import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BnplService } from '../../shared/services/bnpl.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit, OnDestroy {

  itemSelected = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bnplService: BnplService
  ) {
    this.route.queryParams.subscribe((params) => {
      const data = {
      actionStrategyPattern: 'SEARCH_CUSTOMER',
      id: params['id']
    };
      this.bnplService.getPersonalInformation(data).subscribe((resp: any) => {
        this.bnplService.personalInformation = resp;
      })
    })
  }


  ngOnDestroy(): void {
    const body = document.querySelector('body');
    if(body !== null) {
      body.style.backgroundColor = '#FAFAFA';
    }
  }

  ngOnInit(): void {
    const body = document.querySelector('body');
    if(body !== null) {
      body.style.backgroundColor = '#7DFFB2';
    }
  }

  navigateToClient() {
    window.location.href = this.bnplService.personalInformation.urlRedirect;
  }

}
