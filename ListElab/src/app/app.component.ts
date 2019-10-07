import {Component, OnInit} from '@angular/core';
import {UiService} from './shared/services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  sidebarOpened(): boolean {
    return this.uiService.sidebarOpened;
  }

}
