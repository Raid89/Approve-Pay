import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Credit } from '../../shared/models/credit.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-list-credits',
  templateUrl: './list-credits.component.html',
  styleUrls: ['./list-credits.component.css']
})
export class ListCreditsComponent implements OnInit {

  authServices = inject(AuthService);
  router = inject(Router);
  credits: Observable<Credit[]> | undefined;

  ngOnInit(): void {
    this.credits = this.authServices.getCredits(this.authServices.document);
  }

  navigateToPay(credit: Credit) {
    this.authServices.credit = credit;
    this.router.navigate(['/pay']);
  }

}
