import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { AverageStatsGridRow } from 'src/models/AverageStatsGridRow';
import { TableColumn } from 'src/models/TableColumn';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { RequestFilters } from 'src/pagination/RequestFilters';
import { AuthenticationService } from 'src/services/authentification.service';
import { StatisticsAverageService } from 'src/services/statistics-average.service';


import { Filter } from 'src/pagination/Filter';
import { FilterLogicalOperators } from 'src/pagination/FilterLogicalOperators';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leader-list',
  templateUrl: './leader-list.component.html',
  styleUrls: ['./leader-list.component.scss']
})
export class LeaderListComponent implements AfterViewInit, AfterContentInit {

  pagedUsersWithStats: PagedResult<AverageStatsGridRow>;
  requestFilters: RequestFilters;

  displayedColumns: string[];
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort = new MatSort();
  

  constructor(
    private _authService: AuthenticationService,
    private _averageStatsService: StatisticsAverageService,
    private _router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
  }

  tableColumns: TableColumn[] = [
    { name: 'firstName', index: 'firstName', displayName: 'FirstName'},
    { name: 'lastName', index: 'lastName', displayName: 'LastName'},
    { name: 'avgSymbolsPerMin', index: 'speed', displayName: 'Speed'},
    { name: 'avgAccuracy', index: 'accuracy', displayName: 'Accuracy'},
    { name: 'avgTime', index: 'time', displayName: 'Time'},
  ];



  ngAfterContentInit(): void {
    this.setting();
  }

  ngAfterViewInit(): void {
    if (!this._authService.isLoggedIn()) this._router.navigate(['/typo/login']);
    this.loadUsersWithStats();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadUsersWithStats();
    });
  }
  

  loadUsersWithStats() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this._averageStatsService.getPagedUsersAndStatsAvg(paginatedRequest)
      .subscribe((pagedUsersWithStats: PagedResult<AverageStatsGridRow>) => {
        this.pagedUsersWithStats = pagedUsersWithStats;
        console.log(this.pagedUsersWithStats);
      })
  }

  setting(){
    this.sort.direction = "desc";
    this.sort.active = "avgSymbolsPerMin";
  }
  

}
