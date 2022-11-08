import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AverageStats } from 'src/models/AverageStats';
import { AuthenticationService } from 'src/services/authentification.service';
import { StatisticsAverageService } from 'src/services/statistics-average.service';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss']
})
export class SocialsComponent implements OnInit {

  constructor(private _authService: AuthenticationService,
    private _averageStatsService: StatisticsAverageService) { }

    stats: AverageStats = new AverageStats(56, 96, "01:01", 0);
  @ViewChild('vk') vk: ElementRef;

  ngOnInit(): void {
    // this.vk.nativeElement.innerHTML = `
    // VK.Share.button({
    //     url: 'https://dimitris-kidis.github.io/typo/',
    //     title: "ffkfjkfmnjfk,m nm",
    //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjLKVWf8SMTqFL89o58tpWhcPQgNffkU1EupdkSHTctkKQsQohOblZXBvkJDQgUaKy4I&usqp=CAU'
    //   }, {type: 'custom', text: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg" style="width: 43px" />'})
    // `
    const id = this._authService.getUserId();
    this._averageStatsService
      .getAverageStatisticsById(id)
      .subscribe((res: AverageStats) => this.stats = res);
  }

  

  telegramWindowOpen() {
    const pageUrl = location.href;
    const message = `My stats are: ${this.stats.avgSymbolsPerMin}(speed), ${this.stats.avgAccuracy}(accuracy), ${this.stats.avgTime}(time)! Try it for yourself!`;
    const telegramApi = `https://t.me/share/url?url=${pageUrl}&text=${message}`;
    window.open(telegramApi, 'blank')
  }

}

// document.getElementById('vk_share_button').innerHTML = VK.Share.button({
//   url: 'https://dimitris-kidis.github.io/typo/',
//   title: `Моя скорость печати — ${"fff"} знаков в минуту! Попробуй и ты :)`,
//   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjLKVWf8SMTqFL89o58tpWhcPQgNffkU1EupdkSHTctkKQsQohOblZXBvkJDQgUaKy4I&usqp=CAU'
// }, {type: 'custom', text: '<img src="https://upload.wikimedia.org/wikipedia/commons/2/21/VK.com-logo.svg" style="width: 43px" />'});




