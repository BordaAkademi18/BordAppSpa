import { Component, Input } from '@angular/core';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  constructor(public snackBar: MatSnackBar, private router: Router) { }

  logOut(message: string, action: string)
  {
    let ref = this.snackBar.open(message, action, {
      duration: 1500,
    });
    let isProcessCanceled = false;
    ref.onAction().subscribe( () => isProcessCanceled = true);
    ref.afterDismissed().subscribe( () => {
    if (isProcessCanceled)
    {
      this.snackBar.open("Sign out process is canceled.", "OK", { duration: 1500 })
    }
    else
    {
      this.snackBar.open("Sign out completed.", "OK", { duration: 1500 })
      this.router.navigate(["/login"]);
    }}
  );
  }
}
