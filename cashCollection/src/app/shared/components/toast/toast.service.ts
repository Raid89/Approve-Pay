import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  showToast(toast: Toast) {
    this.toastSubject.next(toast);
    setTimeout(() => {
      this.toastSubject.next(null);
    }, toast.duration || 1000000);
  }
}
