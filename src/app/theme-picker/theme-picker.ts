import {Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, OnInit} from '@angular/core';
import {StyleManager} from '../style-manager/style-manager';
import {CommonModule} from '@angular/common';
import { MaterialModule } from '../material.module';


@Component({
  selector: 'theme-picker',
  templateUrl: 'theme-picker.html',
  styleUrls: ['theme-picker.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {'aria-hidden': 'true'},
})
export class ThemePicker implements OnInit{
  currentTheme;

  themes = [
    {
      style: "deeppurple-amber-theme",
      primary: '#673AB7',
      accent: '#FFC107',
      isDefault: true,
      isDark: false,
    },
    {
      style: "indigo-pink-theme",
      primary: '#3F51B5',
      accent: '#E91E63',
      isDark: false,
    },
    {
      style: "pink-bluegrey-theme",
      primary: '#E91E63',
      accent: '#607D8B',
      isDark: true,
    },
    {
      style: "purple-green-theme",
      primary: '#9C27B0',
      accent: '#4CAF50',
      isDark: true,
    },
  ];

  constructor(
    public styleManager: StyleManager) {
      this.currentTheme = styleManager.model;
    }

  installTheme(style) {
    this.currentTheme = style;
    console.log(style);
    this.styleManager.setStyles(style);
  }

  ngOnInit()
  {
    this.styleManager.setStyles(this.styleManager.model);
  }
}

@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  exports: [ThemePicker],
  declarations: [ThemePicker],
  providers: [StyleManager],
})
export class ThemePickerModule { }
