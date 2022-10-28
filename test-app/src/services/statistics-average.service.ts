import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateAverageStatsCommand } from 'src/commands/AverageStats/UpdateAverageStatisticsCommand';
import { AverageStats } from 'src/models/AverageStats';

@Injectable({
  providedIn: 'root'
})
export class StatisticsAverageService {

  constructor(private httpService: HttpClient) { }

  // GET
  getAverageStatisticsById(id: number): Observable<AverageStats> {
    return this.httpService.get<AverageStats>(`api/average-statistics/stats-avg-${id}`);
  }

  // PUT
  updateAverageStats(command: UpdateAverageStatsCommand): Observable<any> {
    return this.httpService.put<any>("api/average-statistics/stats-avg", command);
  }
}
