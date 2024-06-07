import { Component, OnInit } from '@angular/core';
import { Toast, ToastService } from './toast.service';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  animations: [
    trigger('toastShowHide', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms', style({ opacity: '1' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: '0' })),
      ]),
    ]),
  ]
})
export class ToastComponent implements OnInit {
  toast$: Observable<Toast | null>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }

  ngOnInit(): void {}
}
