import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
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
    
  constructor(private _textService: TextsService,
    private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    this._textService
      .getTextByLanguage('English')
      .subscribe((res: any) => {
        this.textObject = res;
        this.textContent = res.textContent;
        this.textContent = '1!2@3#4$5%6^7&8*9(0)-_=+' //----------------------
        this.author += res.author;
        this.textContentLength = this.textContent.length;
        console.log(this.author);
        this.nextLetter = this.textContent[0];
      })
         
        
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

  @ViewChild('inputProgress') bar: ElementRef;
  updateBar(currentLength: number) {
    const textLength = this.textContent.length;
    this.bar.nativeElement.style.width = `${Math.floor((currentLength/textLength) * 100)}%`;
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
      if ( this.textbox.nativeElement.children[i].classList.contains('incorrect') ) {
        this.mistakes.push(i);
      }
  }

  if ( (+(new Date()) - +this.startTime) / 1000 >= 300 ) {
    this.timeFlag = true;
  }
  if (this.mainInput.nativeElement.value.length >= this.textContentLength || this.timeFlag === true) {
    this.endTime = new Date();
    var timeDiff: number = +this.endTime - +this.startTime;
    timeDiff /= 1000;

    var seconds: number = +(Math.round(timeDiff * 100) / 100).toFixed(2);
    this.mainInput.nativeElement.setAttribute('readonly', 'readonly');

    const uniqueMistakes: number[] = [...new Set(this.mistakes)];

    const symsPerMin:number = +`${Math.trunc((this.textbox.nativeElement.childNodes.length-uniqueMistakes.length)/(seconds/60))}`;
    const accuracy: number = +`${Math.round((this.textbox.nativeElement.childNodes.length-uniqueMistakes.length)/this.textbox.nativeElement.childNodes.length * 100)}`;
    const time = `${Math.trunc(seconds/60).toFixed(0).toString().padStart(2, "0")}:${((seconds%60).toFixed(0)).toString().padStart(2, "0")}`;

    console.log(`
    SPM: ${symsPerMin}, 
    ACC: ${accuracy}%,
    TIME: ${time}
    `);
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

