import { Component, OnInit } from '@angular/core';
import { UpdateAverageStatsCommand } from 'src/commands/AverageStats/UpdateAverageStatisticsCommand';
import { CreateReviewCommand } from 'src/commands/Reviews/CreateReviewCommand';
import { CreateStatisticLineCommand } from 'src/commands/Statistics/CreateStatisticLineCommand';
import { CreateTextCommand } from 'src/commands/Texts/CreateTextCommand';
import { AverageStats } from 'src/models/AverageStats';
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

  constructor(private service: StatisticsService) {}


 
  request: UpdateAverageStatsCommand = new UpdateAverageStatsCommand(
    8,
    10.00,
    10.00,
    "00:00",
    100
  );
  request2: CreateStatisticLineCommand = new CreateStatisticLineCommand(
    45,
    "01:02",
    45,
    3,
    7,
    8,
    "VK"
  );

  ngOnInit() {
    // this.service.createText(this.request3).subscribe(console.log);
    // this.service.deleteTextById(16).subscribe(console.log);
    // this.service.createReview(this.request).subscribe(console.log);
    // this.service.getAllReviews().subscribe(console.log);
    // this.service.getAverageStatisticsById(6).subscribe(console.log);
    // this.service.updateAverageStats(this.request).subscribe(console.log);
    // this.service.getStatisticsListById(9).subscribe(console.log);
    // this.service.createStatisticLine(this.request2).subscribe(console.log);
    // this.service.deleteAllStatisticLinesById(7).subscribe(console.log);
    
  }
  
  
}