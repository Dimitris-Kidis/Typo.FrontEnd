import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  // stats: AverageStats = new AverageStats(56, 96, "01:01", 0);
  stats: AverageStats;
  
  constructor(
    private _authService: AuthenticationService,
    private _averageStatsService: StatisticsAverageService,
    private _router: Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) this._router.navigate(['/typo/login']);
    const id = this._authService.getUserId();
    this._averageStatsService
      .getAverageStatisticsById(id)
      .subscribe((res: AverageStats) => this.stats = res);
  }
}