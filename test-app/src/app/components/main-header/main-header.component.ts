import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor(private _authService: AuthenticationService,
    private activatedRoute: ActivatedRoute) {
 }

 isLoggedIn: boolean = this._authService.isLoggedIn();
 user: User = new User(0, "", "", "", "", 0, "", false);

  ngOnInit(): void {
    if (this.isLoggedIn) this._authService.getUserdata().subscribe((res: User) => this.user = res);
  }

}
