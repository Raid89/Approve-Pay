import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent {
  @Output() countDown = new EventEmitter();
  countdownValue: string = '';
  secondsLeft: number = 0;
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.loadCountdownValue();
    this.startCountdown();
  }

  startCountdown(): void {
    this.interval = setInterval(() => {
      if (this.secondsLeft <= 0) {
        clearInterval(this.interval);
        this.countdownValue = '0:00';
        sessionStorage.removeItem('countdownSecondsLeft');
        this.countDown.emit();
      } else {
        const minutes = Math.floor(this.secondsLeft / 60);
        const seconds = this.secondsLeft % 60;
        this.countdownValue = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.secondsLeft--;
        sessionStorage.setItem('countdownSecondsLeft', this.secondsLeft.toString());
      }
    }, 1000);
  }

  restartCountdown(): void {
    this.secondsLeft = 3 * 60;
    sessionStorage.setItem('countdownSecondsLeft', this.secondsLeft.toString());
    clearInterval(this.interval);
    this.startCountdown();
  }

  loadCountdownValue(): void {
    const savedSecondsLeft = sessionStorage.getItem('countdownSecondsLeft');
    if (savedSecondsLeft) {
      this.secondsLeft = parseInt(savedSecondsLeft, 10);
    } else {
      this.secondsLeft = 3 * 60; // Si no hay un valor guardado, inicia el contador desde 3 minutos
    }
  }
}
