import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateAverageStatsCommand } from 'src/commands/AverageStats/UpdateAverageStatisticsCommand';
import { CreateReviewCommand } from 'src/commands/Reviews/CreateReviewCommand';
import { CreateStatisticLineCommand } from 'src/commands/Statistics/CreateStatisticLineCommand';
import { CreateTextCommand } from 'src/commands/Texts/CreateTextCommand';
import { AverageStats } from 'src/models/AverageStats';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentification.service';
import { ReviewsService } from 'src/services/reviews.service';
import { StatisticsAverageService } from 'src/services/statistics-average.service';
import { StatisticsService } from 'src/services/statistics.service';
import { TextsService } from 'src/services/texts.service';
import { UsersService } from 'src/services/users.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private _authService: AuthenticationService) { }

  isLoggedIn: boolean = this._authService.isLoggedIn();
  user: User = new User(0, "", "", "", "", 0, "", false);
  


  ngOnInit() {
    if (this.isLoggedIn) this._authService.getUserdata().subscribe((res: User) => this.user = res);
  }
  
  
}