import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SimulatorRoutingModule } from './simulator-routing.module';
import { SimulatorComponent } from './simulator.component';


@NgModule({
  declarations: [
    SimulatorComponent
  ],
  imports: [
    CommonModule,
    SimulatorRoutingModule,
    SharedModule,
  ]
})
export class SimulatorModule { }
