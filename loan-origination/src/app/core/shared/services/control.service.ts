import { Injectable } from '@angular/core';
import { ControlBase } from '../models/control-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isDay } from 'src/app/shared/validators/dayValidator';
import { isMonth } from 'src/app/shared/validators/monthValidator';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  constructor() {}

  toFormGroup(controls: ControlBase<string>[]) {
    const group: any = {};

    controls.forEach((control) => {
      // group[control.key] =
      //   control.required && control.pattern
      //     ? new FormControl(control.value || '', [
      //         Validators.required,
      //         Validators.pattern(control.pattern),
      //         Validators.minLength(control.minLength),
      //         Validators.maxLength(control.maxLength),
      //       ])
      //     : new FormControl(control.value || '');

      if(control.required && control.isDay && control.pattern) {
        group[control.key] = new FormControl(control.value || '', [
          Validators.required,
          Validators.pattern(control.pattern),
          Validators.minLength(control.minLength),
          Validators.maxLength(control.maxLength),
          isDay,
        ]);
        
      } else if (control.required && control.isMonth && control.pattern) {
        group[control.key] =  new FormControl(control.value || '', [
          Validators.required,
          Validators.minLength(control.minLength),
          Validators.maxLength(control.maxLength),
          isMonth,
        ]);
      } else if(control.required && control.pattern) {
        group[control.key] = new FormControl(control.value || '', [
          Validators.required,
          Validators.pattern(control.pattern),
          Validators.minLength(control.minLength),
          Validators.maxLength(control.maxLength)
        ]);
      } else {
        group[control.key] = new FormControl(control.valueObject || '');
      }

    });
    console.log(group);
    return new FormGroup(group);
  }
}
