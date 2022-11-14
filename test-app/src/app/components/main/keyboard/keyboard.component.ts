import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
      if (this.eventEmitterService.subsVar==undefined) {    
        this.eventEmitterService.subsVar = this.eventEmitterService.    
        invokeKeyboardFunction.subscribe((letter: string) => {    
          this.passLetter(letter);    
        }); 
    }
  }

  passLetter(letter: string) {    
      disableHelper(this.keyboard);
      helpingHand(this.keyboard, letter, true);  
  } 

  @Input() nextLetter: string;
  @Input() mainInput: any;

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
  console.log('hand ' + nextLetter)
  // nextLetter = '9';
  console.log(keyboard.nativeElement);
    switch (nextLetter) {
      // ПЕРВЫЙ РЯД КЛАВИАТУРЫ
      case '1':
        keyboard.nativeElement.childNodes[0].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[15].classList.remove('hidden');
        break;
      case '!':
        keyboard.nativeElement.childNodes[0].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');;
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
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '3':
        keyboard.nativeElement.childNodes[0].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[17].classList.remove('hidden');
        break;
      case '#':
        keyboard.nativeElement.childNodes[0].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '4':
        keyboard.nativeElement.childNodes[0].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[18].classList.remove('hidden');
        break;
      case '$':
        keyboard.nativeElement.childNodes[0].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '5':
        keyboard.nativeElement.childNodes[0].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[19].classList.remove('hidden');
        break;
      case '%':
        keyboard.nativeElement.childNodes[0].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '6':
        keyboard.nativeElement.childNodes[0].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[20].classList.remove('hidden');
        break;
      case '^':
        keyboard.nativeElement.childNodes[0].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case '7':
        keyboard.nativeElement.childNodes[0].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[21].classList.remove('hidden');
        break;
      case '&':
        keyboard.nativeElement.childNodes[0].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '8':
        keyboard.nativeElement.childNodes[0].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[22].classList.remove('hidden');
        break;
      case '*':
        keyboard.nativeElement.childNodes[0].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[22].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case '9':
        keyboard.nativeElement.childNodes[0].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[23].classList.remove('hidden');
        break;
      case '(':
        keyboard.nativeElement.childNodes[0].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[23].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');;
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
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