import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrl: './menu-home.component.scss'
})
export class MenuHomeComponent {
  private accessList = sessionStorage.getItem('modules');

  validateAccessList(module: string): boolean {
    if(this.accessList?.includes(module)) return true
    return false
  }
}
