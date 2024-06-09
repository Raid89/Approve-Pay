import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonColor: string = '#191F38';
  @Input() buttonTextColor: string = '#7DFFB2';
  @Input() buttonText: string = 'Confirmar';
  @Input() buttonDisabled: boolean = false;

  get bgColor(): string {
    return `bg-[${this.buttonColor}]` ?? '';
  }

  get textColor(): string {
    return `text-[${this.buttonTextColor}]` ?? '';
  }
}
