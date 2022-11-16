import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateLanguageByIdCommand } from 'src/commands/UsersInfo/UpdateLanguageByIdCommand';
import { UpdateThemeByIdCommand } from 'src/commands/UsersInfo/UpdateThemeByIdCommand';

@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {

  constructor(private _httpService: HttpClient) {
  }

  // UPDATE
  updateLanguageById(command: UpdateLanguageByIdCommand): Observable<any> {
    return this._httpService.patch<any>("api/user-info/language", command);
  }

  updateThemeById(command: UpdateThemeByIdCommand): Observable<any> {
    return this._httpService.patch<any>("api/user-info/theme", command);
  }
}
