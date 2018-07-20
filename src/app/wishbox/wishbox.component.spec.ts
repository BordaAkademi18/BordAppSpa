import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishboxComponent } from './wishbox.component';

describe('WishboxComponent', () => {
  let component: WishboxComponent;
  let fixture: ComponentFixture<WishboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
