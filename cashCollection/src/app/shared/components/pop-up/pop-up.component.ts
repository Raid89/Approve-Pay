import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IDialogData {
  popUpText: string;
  buttonText: string;
} 

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) {}
}
