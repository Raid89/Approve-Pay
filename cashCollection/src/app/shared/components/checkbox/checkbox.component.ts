import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() checkId!: string;
  @Input() isChecked: boolean | undefined = false;
  @Output() returnValue = new EventEmitter<boolean>()
  

  onCheckboxChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.returnValue.emit(inputElement.checked)
  }
}
