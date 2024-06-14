import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() dynamicData: any;
  @Input() creditNumber!: string;
}
