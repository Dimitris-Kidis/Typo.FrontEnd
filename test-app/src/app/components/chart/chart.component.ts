import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Color } from 'chart.js';
import { ChartDataset } from 'chart.js';
import Chart from 'chart.js/auto';
import { ChartData } from 'src/models/Chart';
import { AuthenticationService } from 'src/services/authentification.service';
import { StatisticsService } from 'src/services/statistics.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  lineChart: any;
  chartData: ChartData[];
  dates: string[];
  speeds: number[];

  constructor(private _usersService: UsersService,
    private _authService: AuthenticationService,
    private _statsService: StatisticsService,
    private _router: Router) {}

  ngOnInit() {
    const id = this._authService.getUserId();
    this._usersService
      .getChartDataById(id)
      .subscribe((res: ChartData[]) => {
        this.chartData = res;
        let dates: string[] = [];
        let speeds: number[] = [];
        for (let index = 0; index < res.length; index++) {
          let date = res[index].date.toString().split('T');
          dates.push(date[0]);
          speeds.push(parseInt(res[index].symbolsPerMinute.toString()));
        }
        this.lineChartMethod(dates, speeds);
      })
  }



  lineChartMethod(dates: string[], speeds: number[]) {
    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            tension: 0.2,
            backgroundColor: 'rgb(0, 231, 71)',
            borderColor: 'rgb(0, 231, 71)',
            data: speeds,
          },
        ],
      },
      options: {
        plugins:{   
          legend: {
            display: false
                  },
        },
      }
    });
  }

  deleteAllStats() {
    const id = this._authService.getUserId();
    this._statsService.deleteAllStatisticLinesById(id).subscribe({
      next: async (res: any) => {
        this._router.navigate(['/typo/account']).then(() => {
           window.location.reload();
        });
      },
      error:
        async () => {
          
        }
    });
  }


}

