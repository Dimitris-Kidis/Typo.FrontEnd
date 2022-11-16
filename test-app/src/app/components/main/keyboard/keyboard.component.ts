import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor(private _eventEmitterService: EventEmitterService,
    private _eventEmitterService2: EventEmitterService) { }

  ngOnInit(): void {
      if (this._eventEmitterService.subsVar==undefined) {    
        this._eventEmitterService.subsVar = this._eventEmitterService.    
        invokeKeyboardFunction.subscribe((letter: string) => {    
          this.passLetter(letter);  
        }); 
        
      }

      if (this._eventEmitterService2.subsVar2==undefined) {    
        this._eventEmitterService2.subsVar2 = this._eventEmitterService2.
        invokeBackspaceFunction.subscribe(() => {    
          this.highlightError();   
        }); 
      }
  }

  @ViewChild('caps') capsLock: ElementRef;

  passLetter(letter: string) {    
    if (this.capsFlag == true) {
      this.capsLock.nativeElement.style.backgroundColor = '#ff000024'
      this.capsLock.nativeElement.style.border = '1px solid 1px solid rgb(168 125 125 / 34%)';
      this.capsLock.nativeElement.style.boxShadow = 'rgb(219 49 49 / 20%) 2px 2px 10px 6px'
      
    } else {
      this.capsLock.nativeElement.style.backgroundColor = 'white'
      this.capsLock.nativeElement.style.border = '1px solid #c7d0d4'
      this.capsLock.nativeElement.style.boxShadow = '2px 2px 2px rgb(0 0 0 / 14%)'
    }
    if (this.handCross.nativeElement.style.display == 'block') {
      disableHelper(this.keyboard);
      helpingHand(this.keyboard, letter, true); 
    }
  } 

  async highlightError() {
    console.log('high');
    const backspace = await this.keyboard.nativeElement.childNodes[0].childNodes[13];
    // console.log(backspace);
    backspace.style.backgroundColor = '#ff000024';
    backspace.style.border = '1px solid 1px solid rgb(168 125 125 / 34%)';
    backspace.style.boxShadow = 'rgb(219 49 49 / 20%) 2px 2px 10px 6px';
    await delay(2500);
    backspace.style.backgroundColor = 'white';
    backspace.style.border = '1px solid #c7d0d4';
    backspace.style.boxShadow = '2px 2px 2px rgb(0 0 0 / 14%)';
  }

  @Input() nextLetter: string;
  @Input() mainInput: any;
  @Input() capsFlag: boolean;

  @ViewChild('bucketHelper') bucketHelper: ElementRef; @ViewChild('cross1') bucketCross: ElementRef;
  @ViewChild('keyboardHelper') keyboardHelper: ElementRef; @ViewChild('cross2') keyboardCross: ElementRef;
  @ViewChild('handHelper') handHelper: ElementRef; @ViewChild('cross3') handCross: ElementRef;

  @ViewChild('keyboard') keyboard: ElementRef;


 

  toggleBucket () {
    if (this.bucketCross.nativeElement.style.display == 'block') {
      this.bucketCross.nativeElement.style.display = 'none';
      keysColor(this.keyboard, false);
    } else {
      this.bucketCross.nativeElement.style.display = 'block';
      keysColor(this.keyboard, true);
    }
    this.mainInput.focus();
  }

  toggleKeyboard() {
    if (this.keyboardCross.nativeElement.style.display == 'block') {
      this.keyboardCross.nativeElement.style.display = 'none';
      this.keyboard.nativeElement.style.visibility = 'hidden';
    } else {
      this.keyboardCross.nativeElement.style.display = 'block';
      this.keyboard.nativeElement.style.visibility = 'visible';
    }  
    this.mainInput.focus();
  }

  toggleHand () {
    if (this.handCross.nativeElement.style.display == 'block') {
      this.handCross.nativeElement.style.display = 'none';
      disableHelper(this.keyboard);
    } else {
      this.handCross.nativeElement.style.display = 'block';
      this.passLetter(this.nextLetter);
    } 
    this.mainInput.focus();
  }

}


function keysColor (keyboard: any, flag: boolean) {
  if (flag) {
    keyboard.nativeElement.children[0].children[0].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[0].children[1].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[0].children[2].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[0].children[3].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[0].children[4].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[0].children[5].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[0].children[6].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[0].children[7].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[0].children[8].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[0].children[9].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[0].children[10].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[0].children[11].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[0].children[12].style.backgroundColor = '#C181F3';

    keyboard.nativeElement.children[1].children[1].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[1].children[2].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[1].children[3].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[1].children[4].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[1].children[5].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[1].children[6].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[1].children[7].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[1].children[8].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[1].children[9].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[1].children[10].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[1].children[11].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[1].children[12].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[1].children[13].style.backgroundColor = '#C181F3';

    keyboard.nativeElement.children[2].children[1].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[2].children[2].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[2].children[3].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[2].children[4].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[2].children[5].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[2].children[6].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[2].children[7].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[2].children[8].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[2].children[9].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[2].children[10].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[2].children[11].style.backgroundColor = '#C181F3';


    keyboard.nativeElement.children[3].children[1].style.backgroundColor = '#C181F3';
    keyboard.nativeElement.children[3].children[2].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[3].children[3].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[3].children[4].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[3].children[5].style.backgroundColor = '#FFB966';
    keyboard.nativeElement.children[3].children[6].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[3].children[7].style.backgroundColor = '#FFDB1E';
    keyboard.nativeElement.children[3].children[8].style.backgroundColor = '#72FF66';
    keyboard.nativeElement.children[3].children[9].style.backgroundColor = '#8B89DF';
    keyboard.nativeElement.children[3].children[10].style.backgroundColor = '#C181F3';
  } else {
    for(let i = 0; i < keyboard.nativeElement.childNodes.length; i++) {
      for(let j = 0; j < 14; j++) {
        try {
          keyboard.nativeElement.children[i].children[j].style.backgroundColor = 'white';
        } catch (error) {
          break;
        }
      }
    }
  }
}


function helpingHand(keyboard: ElementRef, nextLetter:string, flag: boolean) {
  console.log(keyboard.nativeElement);
    switch (nextLetter) {
      // I
      case '1':
        keyboard.nativeElement.childNodes[0].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[15].classList.remove('hidden');
        break;
      case '!':
        keyboard.nativeElement.childNodes[0].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '2':
        keyboard.nativeElement.childNodes[0].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[16].classList.remove('hidden');
        break;
      case '@':
        keyboard.nativeElement.childNodes[0].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '3':
        keyboard.nativeElement.childNodes[0].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[17].classList.remove('hidden');
        break;
      case '#':
        keyboard.nativeElement.childNodes[0].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '4':
        keyboard.nativeElement.childNodes[0].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[18].classList.remove('hidden');
        break;
      case '$':
        keyboard.nativeElement.childNodes[0].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '5':
        keyboard.nativeElement.childNodes[0].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[19].classList.remove('hidden');
        break;
      case '%':
        keyboard.nativeElement.childNodes[0].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '6':
        keyboard.nativeElement.childNodes[0].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[20].classList.remove('hidden');
        break;
      case '^':
        keyboard.nativeElement.childNodes[0].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '7':
        keyboard.nativeElement.childNodes[0].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[21].classList.remove('hidden');
        break;
      case '&':
        keyboard.nativeElement.childNodes[0].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '8':
        keyboard.nativeElement.childNodes[0].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[22].classList.remove('hidden');
        break;
      case '*':
        keyboard.nativeElement.childNodes[0].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[22].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '9':
        keyboard.nativeElement.childNodes[0].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[23].classList.remove('hidden');
        break;
      case '(':
        keyboard.nativeElement.childNodes[0].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[23].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '0':
        keyboard.nativeElement.childNodes[0].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[24].classList.remove('hidden');
        break;
      case ')':
        keyboard.nativeElement.childNodes[0].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[24].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '-':
        keyboard.nativeElement.childNodes[0].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[25].classList.remove('hidden');
        break;
      case '_':
        keyboard.nativeElement.childNodes[0].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[25].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '=':
        keyboard.nativeElement.childNodes[0].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[26].classList.remove('hidden');
        break;
      case '+':
        keyboard.nativeElement.childNodes[0].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[26].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;


      // II
      case 'q':
        keyboard.nativeElement.childNodes[1].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[14].classList.remove('hidden');
        break;
      case 'Q':
        keyboard.nativeElement.childNodes[1].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[14].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'w':
        keyboard.nativeElement.childNodes[1].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[15].classList.remove('hidden');
        break;
      case 'W':
        keyboard.nativeElement.childNodes[1].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'e':
        keyboard.nativeElement.childNodes[1].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[16].classList.remove('hidden');
        break;
      case 'E':
        keyboard.nativeElement.childNodes[1].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'r':
        keyboard.nativeElement.childNodes[1].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[17].classList.remove('hidden');
        break;
      case 'R':
        keyboard.nativeElement.childNodes[1].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 't':
        keyboard.nativeElement.childNodes[1].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[18].classList.remove('hidden');
        break;
      case 'T':
        keyboard.nativeElement.childNodes[1].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'y':
        keyboard.nativeElement.childNodes[1].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[19].classList.remove('hidden');
        break;
      case 'Y':
        keyboard.nativeElement.childNodes[1].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'u':
        keyboard.nativeElement.childNodes[1].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[20].classList.remove('hidden');
        break;
      case 'U':
        keyboard.nativeElement.childNodes[1].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'i':
        keyboard.nativeElement.childNodes[1].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[21].classList.remove('hidden');
        break;
      case 'I':
        keyboard.nativeElement.childNodes[1].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'o':
        keyboard.nativeElement.childNodes[1].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[22].classList.remove('hidden');
        break;
      case 'O':
        keyboard.nativeElement.childNodes[1].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[22].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'p':
        keyboard.nativeElement.childNodes[1].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[23].classList.remove('hidden');
        break;
      case 'P':
        keyboard.nativeElement.childNodes[1].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[23].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '[':
        keyboard.nativeElement.childNodes[1].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[24].classList.remove('hidden');
        break;
      case '{':
        keyboard.nativeElement.childNodes[1].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[24].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case ']':
        keyboard.nativeElement.childNodes[1].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[25].classList.remove('hidden');
        break;
      case '}':
        keyboard.nativeElement.childNodes[1].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[25].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '\\':
        keyboard.nativeElement.childNodes[1].childNodes[13].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[26].classList.remove('hidden');
        break;
      case '|':
        keyboard.nativeElement.childNodes[1].childNodes[13].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[26].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      
      // III
      case 'a':
        keyboard.nativeElement.childNodes[2].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[12].classList.remove('hidden');
        break;
      case 'A':
        keyboard.nativeElement.childNodes[2].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[12].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 's':
        keyboard.nativeElement.childNodes[2].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[13].classList.remove('hidden');
        break;
      case 'S':
        keyboard.nativeElement.childNodes[2].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[13].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'd':
        keyboard.nativeElement.childNodes[2].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[14].classList.remove('hidden');
        break;
      case 'D':
        keyboard.nativeElement.childNodes[2].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[14].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'f':
        keyboard.nativeElement.childNodes[2].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[15].classList.remove('hidden');
        break;
      case 'F':
        keyboard.nativeElement.childNodes[2].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'g':
        keyboard.nativeElement.childNodes[2].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[16].classList.remove('hidden');
        break;
      case 'G':
        keyboard.nativeElement.childNodes[2].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'h':
        keyboard.nativeElement.childNodes[2].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[17].classList.remove('hidden');
        break;
      case 'H':
        keyboard.nativeElement.childNodes[2].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'j':
        keyboard.nativeElement.childNodes[2].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[18].classList.remove('hidden');
        break;
      case 'J':
        keyboard.nativeElement.childNodes[2].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'k':
        keyboard.nativeElement.childNodes[2].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[19].classList.remove('hidden');
        break;
      case 'K':
        keyboard.nativeElement.childNodes[2].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'l':
        keyboard.nativeElement.childNodes[2].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[20].classList.remove('hidden');
        break;
      case 'L':
        keyboard.nativeElement.childNodes[2].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case ';':
        keyboard.nativeElement.childNodes[2].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[21].classList.remove('hidden');
        break;
      case ':':
        keyboard.nativeElement.childNodes[2].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '\'':
        keyboard.nativeElement.childNodes[2].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[22].classList.remove('hidden');
        break;
      case '"':
        keyboard.nativeElement.childNodes[2].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[22].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      
      // IV
      case 'z':
        keyboard.nativeElement.childNodes[3].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[12].classList.remove('hidden');
        break;
      case 'Z':
        keyboard.nativeElement.childNodes[3].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[12].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'x':
        keyboard.nativeElement.childNodes[3].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[13].classList.remove('hidden');
        break;
      case 'X':
        keyboard.nativeElement.childNodes[3].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[13].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'c':
        keyboard.nativeElement.childNodes[3].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[14].classList.remove('hidden');
        break;
      case 'C':
        keyboard.nativeElement.childNodes[3].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[14].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'v':
        keyboard.nativeElement.childNodes[3].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[15].classList.remove('hidden');
        break;
      case 'V':
        keyboard.nativeElement.childNodes[3].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'b':
        keyboard.nativeElement.childNodes[3].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[16].classList.remove('hidden');
        break;
      case 'B':
        keyboard.nativeElement.childNodes[3].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case 'n':
        keyboard.nativeElement.childNodes[3].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[17].classList.remove('hidden');
        break;
      case 'N':
        keyboard.nativeElement.childNodes[3].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case 'm':
        keyboard.nativeElement.childNodes[3].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[18].classList.remove('hidden');
        break;
      case 'M':
        keyboard.nativeElement.childNodes[3].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case ',':
        keyboard.nativeElement.childNodes[3].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[19].classList.remove('hidden');
        break;
      case '<':
        keyboard.nativeElement.childNodes[3].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '.':
        keyboard.nativeElement.childNodes[3].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[20].classList.remove('hidden');
        break;
      case '>':
        keyboard.nativeElement.childNodes[3].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '/':
        keyboard.nativeElement.childNodes[3].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[21].classList.remove('hidden');
        break;
      case '?':
        keyboard.nativeElement.childNodes[3].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;

      // specials
      case ' ':
        keyboard.nativeElement.childNodes[4].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[4].childNodes[1].classList.remove('hidden');
        break;
      
    }
}

function disableHelper (keyboard: ElementRef) {
  for(let i = 0; i < keyboard.nativeElement.childNodes.length; i++) {
    for(let j = 0; j < 50; j++) {
      try {
        if ( keyboard.nativeElement.children[i].children[j].classList.contains('hand') ) {
          keyboard.nativeElement.children[i].children[j].classList.add('hidden')
        }
        if ( keyboard.nativeElement.children[i].children[j].classList.contains('highlighted') ) {
          keyboard.nativeElement.children[i].children[j].classList.remove('highlighted')
        }
      } catch (error) {
        break;
      }
    }
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}