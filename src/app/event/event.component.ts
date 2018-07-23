/// <reference path="../../../node_modules/@types/yandex-maps/index.d.ts"/>

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { StyleManager } from '../style-manager';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  map: ymaps.Map;

  step = 0;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2000, 0, 1);

  event_name = new FormControl('', [Validators.required]);

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  personCtrl = new FormControl();
  filteredPeople: Observable<string[]>;
  people: string[] = [];
  allPeople: string[] = ['Alptuğ Yeşilırmak', 'Mehmet Yeşiloğlu', 'Sinem Demiryürek', 'Hande Elitez'];

  mapReady = false;

  constructor(private styleManager: StyleManager) {
    let now = new Date(Date.now());
    this.minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.maxDate.setTime(this.minDate.getTime() + 365 * 86400000);
    this.filteredPeople = this.personCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allPeople.slice()));
  }

  ngOnInit() {
    ymaps.ready(() => {
      this.map = new ymaps.Map('map', {
        center: [55.74954, 37.621587],
         zoom: 10
    });
      let myPlacemark = new ymaps.Placemark([55.76, 37.64], { hintContent: 'Moscow!', balloonContent: 'Capital of Russia' });
      this.map.geoObjects.add(myPlacemark);
    });
  }

  ngAfterViewInit() {
  }

  getEventNameErrorMessage() {
    return this.event_name.hasError('required') ? 'You must enter a value' : '';
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  @ViewChild('personInput') personInput: ElementRef;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.people.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.personCtrl.setValue(null);
  }

  remove(person: string): void {
    const index = this.people.indexOf(person);

    if (index >= 0) {
      this.people.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.people.push(event.option.viewValue);
    this.personInput.nativeElement.value = '';
    this.personCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allPeople.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}

export interface Event {
  //id
  name: string;
  createdBy: string;
  date: Date;
  place: string;
  invitedMembers: string[];
}
