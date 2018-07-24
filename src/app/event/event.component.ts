/// <reference path="../../../node_modules/@types/yandex-maps/index.d.ts"/>

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatSnackBar } from '@angular/material';
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
  searchControl: ymaps.control.SearchControl;
  selectedPoint: ymaps.Placemark;
  createdEvent: Event;

  @ViewChild('eventname') eventName: ElementRef;
  @ViewChild('info') eventExtraInfo: ElementRef;
  eventPlace: Place = new Place();
  @ViewChild('dateInput') eventDate: ElementRef;
  @ViewChild('timeInput') eventTime: ElementRef;
  @ViewChild('numberOfPeople') eventNumberOfRequiredPeople: ElementRef;
  eventIsAvailableToEveryone: boolean;

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
  isButtonDisabled = true;

  constructor(private styleManager: StyleManager, public snackBar: MatSnackBar) {
    let now = new Date(Date.now());
    this.minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.maxDate.setTime(this.minDate.getTime() + 365 * 86400000);
    this.filteredPeople = this.personCtrl.valueChanges.pipe(
      startWith(null),
      map((person: string | null) => person ? this._filter(person) : this.allPeople.slice()));
  }

  ngOnInit() {
    ymaps.ready(() => {
      this.map = new ymaps.Map('map', {
        center: [41.0847685, 28.9042875],
        zoom: 11
      });
      this.mapReady = true;
      this.map.controls.remove('rulerControl');
    });
  }

  ngAfterViewInit() {
  }

  openSnackBar(message: string, action: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration ? duration : 2000,
    });
  }

  selectPoint() {
    if (this.selectedPoint != null) {
      if (this.searchControl != null) {
        this.searchControl.clear();
      }
    }
    else {
      this.openSnackBar('You haven\'t selected any point.', 'OK');
    }
  }

  getEventNameErrorMessage() {
    return this.event_name.hasError('required') ? 'You must enter a value' : '';
  }

  setStep(index: number) {
    this.step = index;
    if (!(this.searchControl) && this.mapReady) {
      this.map.controls.remove("searchControl");
      this.searchControl = new ymaps.control.SearchControl({
        options: {
          // Search will be performed across toponyms and businesses.
          provider: 'yandex#search'
        }
      });

      // Adding the control to the map.
      this.map.controls.add(this.searchControl);
      this.searchControl.events.add('resultselect', (e: ymaps.IEvent) => {
        // Getting the results array.
        var results = this.searchControl.getResultsArray();
        let selected = +e.get('index');
        this.selectedPoint = (<ymaps.Placemark>results[selected]);
        let point = (<ymaps.geometry.Point>(<ymaps.Placemark>results[selected]).geometry).getCoordinates();
        let response = <ActionResponse>(this.selectedPoint.properties.getAll());
        this.eventPlace.address = response.companyMetaData.address;
        this.eventPlace.coord = point;
        this.eventPlace.placeName = response.name;
      });
    }
  }

  nextStep() {
    if (this.step < 5)
      this.step++;
  }

  prevStep() {
    if (this.step >= 0)
      this.step--;
  }

  @ViewChild('personInput') personInput: ElementRef;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our person
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

  submitEvent() {
  this.createdEvent = new Event();

    this.createdEvent.name = this.eventName.nativeElement.value;
    this.createdEvent.extraInfo = this.eventExtraInfo.nativeElement.value;
    this.createdEvent.createdBy = this.allPeople[0] //TODO: Use authentication cookie (or something else) to get this info
    this.createdEvent.location = this.eventPlace;

    console.log(this.eventDate.nativeElement.value);
    let time = this.eventTime.nativeElement.value.split(':');
    this.createdEvent.timestamp = Date.parse(this.eventDate.nativeElement.value) + Number.parseInt(time[0])
      * 3600 + Number.parseInt(time[1]) * 60;

    this.createdEvent.infoMembers = this.people;
    this.createdEvent.numberOfRequiredPeople = this.eventNumberOfRequiredPeople.nativeElement.value ? this.eventNumberOfRequiredPeople.nativeElement.value : 0;
    this.createdEvent.isAvailableToEveryone = this.eventIsAvailableToEveryone;
    console.log(this.createdEvent)

    /*if (this.eventName.nativeElement.value != '' && this.eventPlace != null && this.eventTime.nativeElement.value != '')
    {
      this.createdEvent.name = this.eventName.nativeElement.value;
      this.createdEvent.extraInfo = this.eventExtraInfo.nativeElement.value;
      this.createdEvent.createdBy = this.allPeople[0] //TODO: Use authentication cookie (or something else) to get this info
      this.createdEvent.location = this.eventPlace;
  
      let time = this.eventTime.nativeElement.value.split(':');
      this.createdEvent.timestamp = Date.parse(this.eventDate.nativeElement.value) + Number.parseInt(time[0])
       * 3600 + Number.parseInt(time[1]) * 60;
  
      this.createdEvent.infoMembers = this.people;
      this.createdEvent.numberOfRequiredPeople = this.eventNumberOfRequiredPeople.nativeElement.value ? this.eventNumberOfRequiredPeople.nativeElement.value : 0;
      this.createdEvent.isAvailableToEveryone = this.eventIsAvailableToEveryone;
      console.log(this.createdEvent)
    }
    else
    {
      this.openSnackBar('Check your entries, you missed giving some information.', 'OK');
    }*/
  }
}

export class Event {
  name: string;
  extraInfo: string;
  createdBy: string;
  location: Place;
  timestamp: number;
  infoMembers: string[];
  numberOfRequiredPeople: number;
  isAvailableToEveryone: boolean;
}

export class Place {
  coord: number[];
  placeName: string;
  address: string;
}

export interface ActionResponse {
  name: string;
  description: string;
  boundedBy: Array<number[]>;
  responseMetaData: MetaData;
  uriMetaData: URIMetaData;
  type: string;
  companyMetaData: MetaData;
  id: string;
  address: string;
  categories: string[];
  categoriesText: string;
  loc: LOC;
}

export interface MetaData {
  id: string;
  name: string;
  nameHighlight: Array<number[]>;
  address: string;
  Address: Address;
  AddressDetails: AddressDetails;
  Categories: Category[];
  Geo: Geo;
  Links: Link[];
  InternalCompanyInfo: InternalCompanyInfo;
}

export interface Address {
  country_code: string;
  formatted: string;
  Components: Component[];
}

export interface Component {
  kind: string;
  name: string;
}

export interface AddressDetails {
  Country: Country;
}

export interface Country {
  AddressLine: string;
  CountryNameCode: string;
  CountryName: string;
  AdministrativeArea: AdministrativeArea;
}

export interface AdministrativeArea {
  AdministrativeAreaName: string;
  SubAdministrativeArea: SubAdministrativeArea;
}

export interface SubAdministrativeArea {
  SubAdministrativeAreaName: string;
  Locality: Locality;
}

export interface Locality {
  Thoroughfare: Thoroughfare;
}

export interface Thoroughfare {
  ThoroughfareName: string;
  Premise: Premise;
}

export interface Premise {
  PremiseNumber: string;
}

export interface Category {
  name: string;
  Tags: string[];
  InternalCategoryInfo: InternalCategoryInfo;
}

export interface InternalCategoryInfo {
  AppleData: AppleData;
  seoname: string;
}

export interface AppleData {
  acid: string;
  level: string;
}

export interface Geo {
  precision: string;
}

export interface InternalCompanyInfo {
  ids: string[];
  geoid: number;
  seoname: string;
}

export interface Link {
  type: string;
  aref: string;
  href: string;
}

export interface LOC {
  timeClosedUntil: string;
  timeOpenUntil: string;
  ratingReviews: string;
  ratingRatings: string;
}

export interface URIMetaData {
  URIs: URI[];
  URI: URI;
}

export interface URI {
  uri: string;
}
