import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from './loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent implements OnInit{

  public loadingScreen = false;

  constructor(private loadingScreenService: LoadingScreenService){}

  ngOnInit(): void {
      this.loadingScreen = this.loadingScreenService.loadingScreen;
      this.loadingScreenService.loadingScreen$.subscribe(data => this.loadingScreen = data)
  }
}
