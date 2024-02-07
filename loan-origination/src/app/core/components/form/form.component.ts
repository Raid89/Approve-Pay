import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlBase } from '../../shared/models/control-base';
import { FormGroup } from '@angular/forms';
import { ControlService } from '../../shared/services/control.service';
import { Client } from 'src/app/feature/BNPL/shared/models/client.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() controls: ControlBase<string>[] | null = [];
  @Output() sendInfo: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() selectedClient: EventEmitter<string> = new EventEmitter<string>()
  form!: FormGroup;
  payLoad = '';

  constructor(private readonly controlService: ControlService) {}

  ngOnInit(): void {
    this.form =  this.controlService.toFormGroup(this.controls as ControlBase<string>[]);
    console.log(this.controls);
    this.form.get('client')?.valueChanges.subscribe((resp) => {
      this.selectedClient.emit(resp);
    })
  }

  onSubmit() {
    console.log(this.form)
    console.log(this.form.value)
    this.sendInfo.emit(this.form.value);
  }

}
