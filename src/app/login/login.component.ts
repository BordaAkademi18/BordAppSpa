import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StyleManager } from '../style-manager';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  value: string = "password";
  checked = false;
  
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(private styleManager: StyleManager) { }

  ngOnInit() {
  }

  onClick (){
    console.log(this.value);
    if(this.value == "password")
      this.value = "text" ;
    else
      this.value = "password";
    }

}
