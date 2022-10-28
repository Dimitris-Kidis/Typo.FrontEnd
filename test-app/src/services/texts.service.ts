import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Text } from '../models/Text'
import { CreateTextCommand } from '../commands/Texts/CreateTextCommand'


@Injectable({
  providedIn: 'root'
})
export class TextsService {

  constructor(private httpService: HttpClient) {
  }
  
  // GET
  getTextByLanguage(language: string): Observable<Text> {
    return this.httpService.get<Text>(`api/texts?language=${language}`);
  }

  // POST
  createText(command: CreateTextCommand): Observable<any> {
    return this.httpService.post<any>("/api/texts", command);
  }

  // DELETE
  deleteTextById(id: number): Observable<any> {
    return this.httpService.delete<any>(`/api/texts/${id}`);
  }
}
