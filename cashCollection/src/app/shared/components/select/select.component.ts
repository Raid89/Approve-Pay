import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  animations: [
    trigger('selectShowHide', [
      transition(':enter', [
        style({ height: '0%' }),
        animate('200ms', style({ height: '*' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ height: '0px'})),
      ]),
    ]),
  ]
})
export class SelectComponent {
  @Input() options!: { value: string, label: string }[];
  @Input() disabled: boolean = false;
  @Output() returnValue = new EventEmitter<string>()
  public selectedOption: string = '5';
  dropdownOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleDropdown(): void { 
    if (this.disabled) return
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: { value: string, label: string }): void {
    this.selectedOption = option.value;
    this.dropdownOpen = false;
    this.returnValue.emit(option.value);
  }

  getSelectedLabel(): string {
    const selectedOption = this.options.find(option => option.value === this.selectedOption);
    return selectedOption ? selectedOption.label : 'Seleccionar';
  }
}
