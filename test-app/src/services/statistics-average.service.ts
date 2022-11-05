import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UpdateAverageStatsCommand } from 'src/commands/AverageStats/UpdateAverageStatisticsCommand';
import { AverageStats } from 'src/models/AverageStats';
import { AverageStatsGridRow } from 'src/models/AverageStatsGridRow';
import { User } from 'src/models/User';
import { UsersAverageStats } from 'src/models/UsersAverageStats';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';

@Injectable({
  providedIn: 'root'
})
export class StatisticsAverageService {

  constructor(private httpService: HttpClient) { }

  // GET
  getAverageStatisticsById(id: number): Observable<AverageStats> {
    return this.httpService.get<AverageStats>(`api/average-statistics/stats-avg-${id}`);
  }

  getPagedUsersAndStatsAvg(paginatedRequest: PaginatedRequest): Observable<PagedResult<AverageStatsGridRow>> {
    console.log(paginatedRequest);
    return this.httpService.post<PagedResult<AverageStatsGridRow>>('api/users/paginated-search-average', paginatedRequest);
  }

  // PUT
  updateAverageStats(command: UpdateAverageStatsCommand): Observable<any> {
    return this.httpService.put<any>("api/average-statistics/stats-avg", command);
  }
}
