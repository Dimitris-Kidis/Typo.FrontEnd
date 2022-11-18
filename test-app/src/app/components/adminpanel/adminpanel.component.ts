import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  constructor(private _authService: AuthenticationService,
    private _router: Router) { }

  isAdmin: boolean = this._authService.isUserAdmin();

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) this._router.navigate(['/typo/login']);
    if (!this._authService.isUserAdmin()) this._router.navigate(['/typo/login']);

  }

}
