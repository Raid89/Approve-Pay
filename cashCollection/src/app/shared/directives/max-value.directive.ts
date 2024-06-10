import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appMaxValue]'
})
export class MaxValueDirective {
  @Input('appMaxValue') maxValue!: number;

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {}

  @HostListener('keyup') onKeyUp(): void {
    let inputValue = this.el.nativeElement.value;
    inputValue = inputValue.replace(/[^\d.]/g, '');
    const numericValue = parseFloat(inputValue);
    if (numericValue > this.maxValue) {
      const formattedValue = this.currencyPipe.transform(this.maxValue, 'USD', '$ ', '1.0-0');
      this.el.nativeElement.value = formattedValue;
      this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }
}
