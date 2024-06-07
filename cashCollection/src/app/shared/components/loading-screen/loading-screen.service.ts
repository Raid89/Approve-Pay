import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private loadingScreenSubject = new BehaviorSubject<boolean>(false);
  
  public loadingScreen$: Observable<boolean> = this.loadingScreenSubject.asObservable();

  public set loadingScreen(value: boolean) {
    this.loadingScreenSubject.next(value);
  }

  public get loadingScreen(): boolean {
    return this.loadingScreenSubject.getValue();
  }
  
  constructor() { }
}
