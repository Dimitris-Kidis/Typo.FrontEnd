import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component, DoCheck, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentification.service';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  providers: [Location]
})
export class MainHeaderComponent implements OnInit {

  constructor(private _authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    public dialog: MatDialog) {
      this.location = location;
  }

  isLoggedIn: boolean = this._authService.isLoggedIn();
  user: User = new User(0, "", "", "", "", "", 0, "", false);

  account: boolean;


  ngOnInit(): void {
    if (this.isLoggedIn) this._authService.getUserdata().subscribe((res: User) => this.user = res);
    this.account = this.currentRoute();
  }

  currentRoute(): boolean {
    const rawRoute = window.location.href;
    const splitted = rawRoute.split('/');
    const dir = splitted[splitted.length - 1]
    if (dir == 'account') return true;
    return false;
  }

  goBack(): void{
    this.router.navigate(['/typo/main']).then(() => {
      window.location.reload();
   });
  }

  goForward(): void{
    this.router.navigate(['/typo/account']).then(() => {
      window.location.reload();
   });
  }

  signOut() {
    this._authService.logOut();
    this.router.navigate(['/typo/login']).then(() => {
      window.location.reload();
   });
  }

  openMenu() {
    this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

}

