
import { AbstractControl } from "@angular/forms"


export const isMonth = (control: AbstractControl) => {
  const value = control.value;

  if(value < 1 || value > 12) {
    return {'isMonth': true}
  }
  return null
}