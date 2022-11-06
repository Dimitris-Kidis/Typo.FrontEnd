import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/models/User';
import { headers, RegistrationResponseDto, UserForAuthenticationDto, UserForRegistrationDto } from '../models/auth';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private userService: UsersService) { }

  sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  

  // public getUserdata = (): Observable<Person>  => {
  //   const token: any = localStorage.getItem('token');
  //   var email:string = this.parseJwt(token).username;
  //   return this._http.post<Person>(`/api/accounts/getUserdata`, {email: email});
  // }

  loginUser(dto: UserForAuthenticationDto): Observable<any> {
    return this._http.post<any>("api/auth/login", dto);
  }

  registerUser(dto: UserForRegistrationDto): Observable<any> {
    return this._http.post<RegistrationResponseDto>("api/auth/registration", dto);
  }

//   public uploadPhoto = (file: File): Observable<any>  => {
//     const token: any = localStorage.getItem('token');
//     var id:number = this.parseJwt(token).id;
//     return this._http.post<any>(`/api/accounts/uploadPhoto`, {file: file, userId: id});
//   }


  logOut(): Observable<any> {
    localStorage.removeItem('token');
    return this._http.post("api/auth/logout", {});
  }

  

  isLoggedIn() {
    const token: any = localStorage.getItem('token'); // get token from local storage
    if (token) {
      const payload = atob(token.split('.')[1]); // decode payload of token
      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      return parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    else {
      return false;
    }
  }

  getUserId(): number {
    const token: any = localStorage.getItem('token');
    return parseInt(this.parseJwt(token).id);
  }

  getUserdata (): Observable<User> {
    const token: any = localStorage.getItem('token');
    var id:string = this.parseJwt(token).id;
    return this._http.get<User>(`api/users/${id}`);
  }

  isUserAdmin(): boolean {
    const token: any = localStorage.getItem('token');
    var isAdmin:string = this.parseJwt(token).isAdmin;
    return isAdmin === 'true';
  }

  parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  uploadPhoto = (file: File): Observable<any>  => {
    const formData = new FormData(); 
    
    const blob = new Blob();

    const token: any = localStorage.getItem('token');
    var id: number = this.parseJwt(token).id;
    formData.append("Files", file);
    formData.append("UserId", `${id}`);
    return this._http.post<any>(`api/avatars`, formData);
  }

  deletePhoto = (): Observable<any> => {        
    const token: any = localStorage.getItem('token');
    var id: number = this.parseJwt(token).id;
    return this._http.delete<any>(`api/avatars/${id}`);
  }

}
