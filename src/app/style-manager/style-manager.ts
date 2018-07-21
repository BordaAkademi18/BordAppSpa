import {Injectable} from '@angular/core';
import { setStyles } from '../../../node_modules/@angular/animations/browser/src/util';


/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable()
export class StyleManager {
  
  model = {
    style: "deeppurple-amber",
    primary: '#673AB7',
    accent: '#FFC107',
    isDefault: true,
    isDark: false,
  };

  setStyles(style) {
    this.model = style;
  }
}