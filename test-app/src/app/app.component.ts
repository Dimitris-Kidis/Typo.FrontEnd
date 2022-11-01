import { Component, OnInit } from '@angular/core';
import { UpdateAverageStatsCommand } from 'src/commands/AverageStats/UpdateAverageStatisticsCommand';
import { CreateReviewCommand } from 'src/commands/Reviews/CreateReviewCommand';
import { CreateStatisticLineCommand } from 'src/commands/Statistics/CreateStatisticLineCommand';
import { CreateTextCommand } from 'src/commands/Texts/CreateTextCommand';
import { AverageStats } from 'src/models/AverageStats';
import { AuthenticationService } from 'src/services/authentification.service';
import { ReviewsService } from 'src/services/reviews.service';
import { StatisticsAverageService } from 'src/services/statistics-average.service';
import { StatisticsService } from 'src/services/statistics.service';
import { TextsService } from 'src/services/texts.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private _authService: AuthenticationService) {}


 
  

  ngOnInit() {
  }
  
  
}