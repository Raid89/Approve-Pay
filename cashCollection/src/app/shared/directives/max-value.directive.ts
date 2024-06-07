import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appMaxValue]'
})
export class MaxValueDirective {
  @Input('appMaxValue') maxValue!: number;

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {}

  @HostListener('input') onInputChange(): void {
    let inputValue = this.el.nativeElement.value;
    inputValue = inputValue.replace(/[^\d.]/g, ''); // Eliminar todos los caracteres no numéricos excepto el punto (.)
    const numericValue = parseFloat(inputValue);
    if (numericValue > this.maxValue) {
      const formattedValue = this.currencyPipe.transform(this.maxValue, 'USD', 'symbol', '1.0-0');
      this.el.nativeElement.value = formattedValue; // Asigna el valor máximo formateado
      this.el.nativeElement.dispatchEvent(new Event('input')); // Dispara el evento 'input' para actualizar el modelo
    }
  }
}
