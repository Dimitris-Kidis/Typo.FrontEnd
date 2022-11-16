import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateStatisticLineCommand } from 'src/commands/Statistics/CreateStatisticLineCommand';
import { Statistic } from 'src/models/Statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private _httpService: HttpClient) { }

  // GET
  getStatisticsListById(id: number): Observable<Statistic[]> {
    return this._httpService.get<Statistic[]>(`api/statistics/statistics-list-${id}`);
  }

  // POST
  createStatisticLine(command: CreateStatisticLineCommand): Observable<any> {
    return this._httpService.post<any>("api/statistics", command);
  }

  // DELETE
  deleteAllStatisticLinesById(id: number): Observable<any> {
    return this._httpService.delete<any>(`api/statistics/${id}`);
  }
}
