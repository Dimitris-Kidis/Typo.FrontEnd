import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { AllUsersViewModel } from 'src/view-models/allUsersViewModel';
import { TextViewModel } from 'src/view-models/textViewModel';

// @Injectable()
@Injectable({
  providedIn: 'root'
})
export class TypoService {

  constructor(private httpService: HttpClient) {
  }

  getAllUsers(): Observable<AllUsersViewModel[]> {
    return this.httpService.get<AllUsersViewModel[]>("api/users/all-users");
  }

  getTextByLanguage(language: string): Observable<TextViewModel> {
    return this.httpService.get<TextViewModel>(`api/texts/${language}`);
  }

  getUserById(id: number): Observable<AllUsersViewModel> {
    return this.httpService.get<AllUsersViewModel>(`api/users/${id}`);
  }


}
