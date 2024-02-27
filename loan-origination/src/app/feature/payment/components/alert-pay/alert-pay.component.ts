import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-alert-pay',
  templateUrl: './alert-pay.component.html',
  styleUrls: ['./alert-pay.component.css']
})
export class AlertPayComponent implements OnInit{
 

  isSucces: boolean = false;
  urlClient: string = '';

  activateRoute = inject(ActivatedRoute);
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.urlClient = this.authService.urlClient;
    this.activateRoute.params.subscribe( params => { 
      if(params['status'] === 'ok') {
        this.isSucces = true;
      }

      if(params['status'] === 'fail') {
        this.isSucces = false;
      }
    });
  }

  navigateToClient() {
    this.router.navigate(['/']);
  }
  

}
