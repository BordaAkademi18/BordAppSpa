import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '../../../node_modules/@angular/forms';
import { Observable } from '../../../node_modules/rxjs';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '../../../node_modules/@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { StyleManager } from '../style-manager';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(private styleManager: StyleManager) {
    let now = new Date(Date.now());
    this.minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    this.maxDate.setTime(this.minDate.getTime() + 365 * 86400000);
    console.log(this.minDate);
    console.log(this.maxDate);
    this.filteredPeople = this.personCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allPeople.slice()));
   }

  ngOnInit() {
  }

  step = 0;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2000, 0, 1);
  
  event_name = new FormControl('', [Validators.required]);


  getErrorMessage() {
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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  personCtrl = new FormControl();
  filteredPeople: Observable<string[]>;
  people: string[] = [ ];
  allPeople: string[] = ['Alptuğ Yeşilırmak', 'Mehmet Yeşiloğlu', 'Sinem Demiryürek', 'Hande Elitez'];

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

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];
}

export interface Section {
  name: string;
  updated: Date;
}
