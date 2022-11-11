import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Text } from '../models/Text'
import { CreateTextCommand } from '../commands/Texts/CreateTextCommand'
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { PagedResult } from 'src/pagination/PagedResult';
import { ITextGridRow } from 'src/models/TextGridRow';
import { UpdateTextCommand } from 'src/commands/Texts/UpdateTextCommand';


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

  getTextById(id: number): Observable<Text> {
    return this.httpService.get<Text>(`api/texts/${id}`);
  }

  getPagedTexts(paginatedRequest: PaginatedRequest): Observable<PagedResult<ITextGridRow>> {
    console.log(paginatedRequest);
    return this.httpService.post<PagedResult<ITextGridRow>>('api/texts/paginated', paginatedRequest);
  }

  // POST
  createText(command: CreateTextCommand): Observable<any> {
    return this.httpService.post<any>("/api/texts", command);
  }

  // DELETE
  deleteTextById(id: number): Observable<any> {
    return this.httpService.delete<any>(`/api/texts/${id}`);
  }

  // PUT
  updateText(command: UpdateTextCommand): Observable<any> {
    return this.httpService.put<any>("api/texts", command);
  }
}
