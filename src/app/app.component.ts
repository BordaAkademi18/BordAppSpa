import { Component } from '@angular/core';
import { StyleManager } from './style-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private styleService: StyleManager) {}
}
