import { Component, Input, OnInit } from '@angular/core';
import { ControlBase } from '../../shared/models/control-base';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {

  @Input() control!: ControlBase<string>;
  @Input() form!: FormGroup;
  options: any;

  get isValid() {
    return this.form.controls[this.control.key].valid;
  }

  constructor() {
    
    
  }
  ngOnInit(): void {
    console.log(this.form);
    console.log(this.control.value);
    console.log(this.control.options);
  }

  compareFunction(a: any, b: any) {
    return (+a.id === +b.id && a.description === b.description);
  }

}
