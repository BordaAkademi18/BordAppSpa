import {async, TestBed} from '@angular/core/testing';
import {ThemePicker, ThemePickerModule} from './theme-picker';


describe('ThemePicker', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ThemePickerModule],
    }).compileComponents();
  }));

  it('should install theme based on href', () => {
    const fixture = TestBed.createComponent(ThemePicker);
    const component = fixture.componentInstance;
    const href = 'pink-bluegrey.css';
  });
});
