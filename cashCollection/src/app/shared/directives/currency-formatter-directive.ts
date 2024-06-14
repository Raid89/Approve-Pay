import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appCurrencyFormatter]',
  providers: [CurrencyPipe],
  exportAs: 'appCurrencyFormatter' // Añadir exportAs aquí
})
export class CurrencyFormatterDirective {
  @Input() currencyCode: string = 'USD';
  @Input() display: 'code' | '$' | 'symbol-narrow' | 'name' = '$';
  @Input() digitsInfo: string = '1.0-0';

  private previousValue: string = '';
  private rawValue: string = '';

  constructor(private el: ElementRef, private currencyPipe: CurrencyPipe) {}

  @HostListener('input', ['$event']) onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove non-numeric characters except for dot (.)
    value = value.replace(/[^0-9.]/g, '');

    // Store the raw value without formatting
    this.rawValue = value;

    // Format the value as currency
    this.previousValue = this.currencyPipe.transform(value, this.currencyCode, this.display, this.digitsInfo) || '';

    // Update the input value
    input.value = this.previousValue;
  }

  @HostListener('focus', ['$event']) onFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      // Remove currency formatting to allow for easier editing
      input.value = this.rawValue;
    }
  }

  @HostListener('blur', ['$event']) onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove non-numeric characters
    value = value.replace(/[^0-9.]/g, '');

    // Format the value as currency
    input.value = this.currencyPipe.transform(value, this.currencyCode, this.display, this.digitsInfo) || '';
  }

  // Method to get the raw value without formatting
  getRawValue(): string {
    return this.rawValue;
  }
}
