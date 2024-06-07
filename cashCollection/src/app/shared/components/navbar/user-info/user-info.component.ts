import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class UserInfoComponent {
  
  @Input() name?: string;

  public logOutButton = false;

  constructor(private elemento: ElementRef) {} // Aquí inyectamos ElementRef

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elemento.nativeElement.contains(event.target) && this.logOutButton) {
      this.changeLogOutButton();
    }
  }

  changeLogOutButton(){
    this.logOutButton = !this.logOutButton;
  }

  logOut() {
    sessionStorage.clear();
    location.href = '/'
  }
}

