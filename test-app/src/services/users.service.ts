import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserCommand } from 'src/commands/Users/CreateUserCommand';
import { UpdateUserCommand } from 'src/commands/Users/UpdateUserCommand';
import { ChartData } from 'src/models/Chart';
import { User } from 'src/models/User';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpService: HttpClient) {
  }

  // GET
  getAllUsers(): Observable<User[]> {
    return this._httpService.get<User[]>("api/users/all-users");
  }

  getUserById(id: number): Observable<User> {
    return this._httpService.get<User>(`api/users/${id}`);
  }

  getChartDataById(id: number): Observable<ChartData[]> {
    return this._httpService.get<ChartData[]>(`api/users/chart-data/${id}`);
  }

  getPagedUsers(paginatedRequest: PaginatedRequest): Observable<PagedResult<User>> {
    console.log(paginatedRequest);
    return this._httpService.post<PagedResult<User>>('api/users/paginated', paginatedRequest);
  }

  // DELETE
  deleteUserById(id: number): Observable<any> {
    return this._httpService.delete<any>(`/api/users/${id}`);
  }

  // POST
  createUser(command: CreateUserCommand): Observable<any> {
    return this._httpService.post<any>("/api/auth/registration", command);
  }

  // PUT
  updateUser(command: UpdateUserCommand): Observable<any> {
    return this._httpService.put<any>("api/users", command);
  }

  // -----

}






