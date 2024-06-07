import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss'
})
export class OtpInputComponent {
  inputValues: string[] = ['', '', '', ''];

  // Evento emitido cuando se completa la entrada en el último campo
  @Output() inputValueComplete = new EventEmitter<string>();

  // Método que se ejecuta cuando se escribe en un campo
  onInput(index: number): void {
    if (index < this.inputValues.length - 1 && this.inputValues[index].length === 1) {
      const nextInput = document.getElementById(`input${index + 2}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
      const inputValue = this.inputValues.join('');
      this.inputValueComplete.emit(inputValue);
  }
}
