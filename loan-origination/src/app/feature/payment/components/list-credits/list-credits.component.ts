import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Credit } from '../../shared/models/credit.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-credits',
  templateUrl: './list-credits.component.html',
  styleUrls: ['./list-credits.component.css']
})
export class ListCreditsComponent implements OnInit {

  authServices = inject(AuthService);
  router = inject(Router);
  credits: Credit[] = [];
  client: any = {};

  ngOnInit(): void {
    this.client = this.authServices.client;
    this.getCredits();
  }

  navigateToPay(credit: Credit) {
    this.authServices.credit = credit;
    this.router.navigate(['/pay']);
  }

  getCredits() {
    this.alertWait('Un momento por favor....');
    this.authServices.getCredits(this.authServices.document).subscribe((resp: Credit[]) => {
      Swal.close();
      this.credits = resp;
    })
  }

  alertWait(text: any) {
    Swal.fire({
      title: text,
      allowOutsideClick: false,
      imageUrl: '../../../../assets/img/AppLoader.gif',
      showConfirmButton: false,
    });
  }

}
