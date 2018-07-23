import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable()
export class StyleManager {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  overlay;

  model = {
    style: "deeppurple-amber-theme",
    primary: '#673AB7',
    accent: '#FFC107',
    isDefault: true,
    isDark: false,
  };

  constructor(private overlayContainer: OverlayContainer,
    private breakpointObserver: BreakpointObserver) {
    this.overlay = overlayContainer.getContainerElement();
  }

  setStyles(style) {
    this.overlay.classList.remove(this.model.style);
    this.overlay.classList.add(style.style);
    this.model = style;
  }
}