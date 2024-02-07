import { AbstractControl } from "@angular/forms"


export const isDay = (control: AbstractControl) : { [key: string]: any } | null=> {
  const value = control.value;
  console.log(value);
  if(value < 1 || value > 31) {
    return {'isDay': true}
  }
  return null;
}