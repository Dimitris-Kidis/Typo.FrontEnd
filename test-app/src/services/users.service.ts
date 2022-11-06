import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserCommand } from 'src/commands/Users/CreateUserCommand';
import { ChartData } from 'src/models/Chart';
import { User } from 'src/models/User';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpService: HttpClient) {
  }

  // GET
  getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>("api/users/all-users");
  }

  getUserById(id: number): Observable<User> {
    return this.httpService.get<User>(`api/users/${id}`);
  }

  getChartDataById(id: number): Observable<ChartData[]> {
    return this.httpService.get<ChartData[]>(`api/users/chart-data/${id}`);
  }

  getPagedUsers(paginatedRequest: PaginatedRequest): Observable<PagedResult<User>> {
    console.log(paginatedRequest);
    return this.httpService.post<PagedResult<User>>('api/users/paginated', paginatedRequest);
  }

  // DELETE
  deleteUserById(id: number): Observable<any> {
    return this.httpService.delete<any>(`/api/users/${id}`);
  }

  // POST
  createUser(command: CreateUserCommand): Observable<any> {
    return this.httpService.post<any>("/api/users", command);
  }
}






