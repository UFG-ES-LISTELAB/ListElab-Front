import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  sidebarOpened = false;

  toggleSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }

}
