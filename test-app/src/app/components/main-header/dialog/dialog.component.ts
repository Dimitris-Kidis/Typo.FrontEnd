import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private _authService: AuthenticationService,
  private router: Router) {}



  signOut() {
    this._authService.logOut();
    this.router.navigate(['/typo/login']).then(() => {
      window.location.reload();
   });
  }
}


