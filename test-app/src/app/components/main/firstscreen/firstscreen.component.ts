import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { UpdateAverageStatsCommand } from 'src/commands/AverageStats/UpdateAverageStatisticsCommand';
import { CreateStatisticLineCommand } from 'src/commands/Statistics/CreateStatisticLineCommand';
import { AverageStats } from 'src/models/AverageStats';
import { AuthenticationService } from 'src/services/authentification.service';
import { StatisticsAverageService } from 'src/services/statistics-average.service';
import { StatisticsService } from 'src/services/statistics.service';
import { TextsService } from 'src/services/texts.service';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-firstscreen',
  templateUrl: './firstscreen.component.html',
  styleUrls: ['./firstscreen.component.scss']
})
export class FirstscreenComponent implements OnInit {

  textContent: string;
  textContentLength: number;
  textObject: Text;
  author: string = '  -  ';
  nextLetter: string;
  finished: boolean = false;
  averageStats: AverageStats;

  textId: number;
  userId: number = this._authService.getUserId();
    
  constructor(private _textService: TextsService,
    private eventEmitterService: EventEmitterService,
    private eventEmitterService2: EventEmitterService,
    private _authService: AuthenticationService,
    private _statsService: StatisticsService,
    private _averageStatsService: StatisticsAverageService
    ) { }

  ngOnInit(): void {
    this._textService
      .getTextByLanguage('English')
      .subscribe((res: any) => {
        this.textObject = res;
        this.textContent = res.textContent;
        // this.textContent = `<span>Hello world!</span>` //----------------------
        this.author += res.author;
        this.textContentLength = this.textContent.length;
        console.log(this.author);
        this.nextLetter = this.textContent[0];
        this.textId = res.id;
      })
    
    this._averageStatsService.getAverageStatisticsById(this.userId).subscribe(
      (res: AverageStats) => {
        this.averageStats = res;
      })
         
        
  }

  capsOn: any;
  capsFlag: boolean;

  capsLockCheck () {
    if (this.capsOn) {
      this.capsFlag = true
    } else {
      this.capsFlag = false
    }
  }
  

  
  myValue: string;
  key = false;
  startTime: Date;
  endTime: Date;
  startFlag: boolean = false;
  timeFlag: boolean = false;
  @ViewChild('textbox') textbox: ElementRef;
  @ViewChild('mainInput') mainInput: ElementRef;
  mistakes:number[] = [];
  inputStart(val: string) {
    this.capsLockCheck()
    this.updateBar(val.length);
    if (!this.startFlag) {
      this.convertText();
      this.startTime = start();
      this.startFlag = true;
      console.log(this.startTime);
    }
    this.inputCheck(val);


    let nextLetter = this.textbox.nativeElement.innerText[this.mainInput.nativeElement.value.length];
    this.nextLetter = nextLetter;
    this.passLetterToKeyboard(nextLetter);
    console.log(nextLetter);
  }

  passLetterToKeyboard(letter: string){    
    this.eventEmitterService.passToKeyboard(letter);    
  }

  showError () {
    this.eventEmitterService.invokeBackspace();
  }

  finishing(speed: number, accuracy: number, time: string) {
    const mist = this.mistakes.length == null ? 0 : this.mistakes.length;
    const statLine: CreateStatisticLineCommand = {
      userId: this.userId,
      textId: this.textId,
      symbolsPerMinute: speed,
      accuracy: accuracy,
      time: time,
      numberOfMistakes: mist
    }
    this._statsService.createStatisticLine(statLine).subscribe();


    const oldSecs = this.returnSecsFromString(this.averageStats.avgTime);
    const newSecs = this.returnSecsFromString(time);
    const newTimeString = `${Math.trunc(((oldSecs+newSecs)/2)/60).toFixed(0).toString().padStart(2, "0")}:${((((oldSecs+newSecs)/2)%60).toFixed(0)).toString().padStart(2, "0")}`
    console.log(oldSecs, newSecs, newTimeString);
    // const oldAvgSecsArr = (this.averageStats.avgTime).split(':');
    // const oldSecs = (+oldAvgSecsArr[0] * 60) + (+oldAvgSecsArr[1]);
                          


    const averageStatLine: UpdateAverageStatsCommand = {
      id: this.userId,
      avgSymbolsPerMin: (statLine.symbolsPerMinute + this.averageStats.avgSymbolsPerMin)/2,
      avgAccuracy: (statLine.accuracy + this.averageStats.avgAccuracy)/2,
      avgTime: newTimeString,
      textsCount: 1+this.averageStats.textsCount
    }
    this._averageStatsService.updateAverageStats(averageStatLine).subscribe();



    setTimeout(() => {
      this.eventEmitterService2.finished([speed, accuracy, time]);
    }, 2000);
  }

  @ViewChild('inputProgress') bar: ElementRef;
  updateBar(currentLength: number) {
    const textLength = this.textContent.length;
    this.bar.nativeElement.style.width = `${Math.floor((currentLength/textLength) * 100)}%`;
  }

  returnSecsFromString(time: string): number {
    const oldAvgSecsArr = (time).split(':');
    const oldSecs = (+oldAvgSecsArr[0] * 60) + (+oldAvgSecsArr[1]);
    return oldSecs;
  }

  
  inputCheck(value: string) {
    const arrayQuote = this.textbox.nativeElement.querySelectorAll('span');
    const arrayValue = value.split('');
    arrayQuote.forEach((characterSpan: HTMLSpanElement, index: number) => {
      const character = arrayValue[index]
      if (character == null) {
        characterSpan.classList.remove('correct');
        characterSpan.classList.remove('incorrect');
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.remove('incorrect');
        characterSpan.classList.add('correct');
      } else if (character !== characterSpan.innerText) {
        characterSpan.classList.remove('correct');
        characterSpan.classList.add('incorrect');
      }
    })

    for(let i = this.textbox.nativeElement.childNodes.length - 1; i >= 0; i--) {
      if ( this.textbox.nativeElement.children[i].classList.contains('incorrect') 
      && this.mistakes.indexOf(i) == -1) {
        this.mistakes.push(i);
        this.showError();
      }
    }

  
  


  if ( (+(new Date()) - +this.startTime) / 1000 >= 300 ) {
    this.timeFlag = true;
  }
  if (this.mainInput.nativeElement.value.length >= this.textContentLength || this.timeFlag === true) {
    this.finished = true;
    this.endTime = new Date();
    var timeDiff: number = +this.endTime - +this.startTime;
    timeDiff /= 1000;

    var seconds: number = +(Math.round(timeDiff * 100) / 100).toFixed(2);
    this.mainInput.nativeElement.setAttribute('readonly', 'readonly');

    const uniqueMistakes: number[] = [...new Set(this.mistakes)];

    const symsPerMin:number = +`${Math.trunc((this.textbox.nativeElement.childNodes.length-uniqueMistakes.length)/(seconds/60))}`;
    const accuracy: number = +`${Math.round((this.textbox.nativeElement.childNodes.length-uniqueMistakes.length)/this.textbox.nativeElement.childNodes.length * 100)}`;
    const time: string = `${Math.trunc(seconds/60).toFixed(0).toString().padStart(2, "0")}:${((seconds%60).toFixed(0)).toString().padStart(2, "0")}`;

    console.log(`
    SPM: ${symsPerMin}, 
    ACC: ${accuracy}%,
    TIME: ${time},
    MISTAKES: ${this.mistakes}
    `);

    this.finishing(symsPerMin, accuracy, time);

  }
  }







  convertText() {
    let tmp;
    tmp = this.textbox.nativeElement.innerText;
    const wordLength = this.textbox.nativeElement.innerText.length;
    this.textbox.nativeElement.innerText = '';
    tmp.split('').forEach((character: string) => {
      const characterSpan = document.createElement('span');
      characterSpan.innerText = character;
      characterSpan.style.whiteSpace = 'break-spaces';

      this.textbox.nativeElement.appendChild(characterSpan);
    })
  }






}

function start(): Date {
  return new Date();
};

