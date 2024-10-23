import { Component, Input, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { IResponseTotales } from '../../../shared/interfaces/history.interface';
import { CoordinatorInfoComponent } from '../coordinator-info/coordinator-info.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CoordinatorHistoryService } from '../../../core/services/coordinator-history.service';

@Component({
  selector: 'app-coordinator-total',
  templateUrl: './coordinator-total.component.html',
  styleUrl: './coordinator-total.component.scss',
  standalone: true,
  imports: [SharedModule, CommonModule, CoordinatorInfoComponent],
})
export class CoordinatorTotalComponent {
  @Input() totalAmmountCollection!: number;
  @Input() totalEntries!: number;
}
