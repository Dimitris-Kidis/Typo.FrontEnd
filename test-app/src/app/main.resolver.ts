import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentification.service';
import { UsersService } from 'src/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class MainResolver implements Resolve<User> {
  constructor(private usersService: UsersService, private _authService: AuthenticationService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = this._authService.getUserId()
    return this.usersService
      .getUserById(id);
  }
}
