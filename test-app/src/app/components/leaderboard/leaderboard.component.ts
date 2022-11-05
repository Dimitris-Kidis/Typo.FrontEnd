import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { StatisticsAverageService } from 'src/services/statistics-average.service'
import { AuthenticationService } from 'src/services/authentification.service';
import { AverageStats } from 'src/models/AverageStats';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AverageStatsGridRow } from 'src/models/AverageStatsGridRow';
import { PagedResult } from 'src/pagination/PagedResult';
import { RequestFilters } from 'src/pagination/RequestFilters';
import { Filter } from 'src/pagination/Filter';
import { FilterLogicalOperators } from 'src/pagination/FilterLogicalOperators';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { TableColumn } from 'src/models/TableColumn';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';




@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

  
  user: User = new User(0, "", "", "", "", 0, "", false);
  stats: AverageStats = new AverageStats(56, 96, "01:01", 0);

  constructor(
    private _authService: AuthenticationService,
    private _averageStatsService: StatisticsAverageService,
    private _router: Router,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
    this.filterForm = this.formBuilder.group({
      title: [''],
      publisher: ['']
    });
  }

  ngOnInit(): void {
    console.log(this._authService.isLoggedIn());
    if (!this._authService.isLoggedIn()) this._router.navigate(['/typo/login']);
    this._authService.getUserdata().subscribe((res: User) => this.user = res);
    const userId = this._authService.getUserId();
    this._averageStatsService.getAverageStatisticsById(userId).subscribe((res: AverageStats) => this.stats = res);
    

    
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this._averageStatsService.getPagedUsersAndStatsAvg(paginatedRequest)
    .subscribe((pagedBooks: PagedResult<AverageStatsGridRow>) => {
      this.pagedBooks = pagedBooks;
      console.log(pagedBooks);
    });
  }


  // -------

  pagedBooks!: PagedResult<AverageStatsGridRow>;

  tableColumns: TableColumn[] = [
    { name: 'firstName', index: 'firstName', displayName: 'FirstName'},
    { name: 'lastName', index: 'lastName', displayName: 'LastName'},
    { name: 'speed', index: 'speed', displayName: 'Speed', useInSearch: true },
    { name: 'accuracy', index: 'accuracy', displayName: 'Accuracy', useInSearch: true },
    { name: 'time', index: 'time', displayName: 'Time'},
  ];

  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters!: RequestFilters;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;


  ngAfterViewInit() {
    this.loadBooksFromApi();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadBooksFromApi();
    });
  }

  loadBooksFromApi() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this._averageStatsService.getPagedUsersAndStatsAvg(paginatedRequest)
      .subscribe((pagedBooks: PagedResult<AverageStatsGridRow>) => {
        this.pagedBooks = pagedBooks;
        console.log(pagedBooks);
      });
  }

  resetGrid() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.loadBooksFromApi();
  }

  filterBooksFromForm() {
    this.createFiltersFromForm();
    this.loadBooksFromApi();
  }

  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach(key => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn: any = this.tableColumns.find(tableColumn => tableColumn.name === key);
          const filter: Filter = { path : foundTableColumn.index, value : controlValue };
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters
      };
    }
  }
}
