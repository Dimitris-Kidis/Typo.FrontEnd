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

  englishKeys:string[]=['`','~','1','!','2','@','3','#','4','$','5','%','6','^','7','&','8','*', '9','(','0',')', '-','_','=','+',
                        'Q','','W','','E','','R','','T','','Y','','U','','I','','O' ,'', 'P','', '[','{',']','}','\\','|',
                        'A','','S','','D','','F','','G','','H','','J','','K','','L' ,'',';',':','\'','"',
                        'Z','','X','','C','','V','','B','','N','','M','',',','\<','.','\>','\/','?'];

  russianKeys:string[]=['ё','Ё','1','!','2','"','3','№','4',';','5','%','6',':','7','?','8' ,'*' , '9','(','0',')', '-','_','=','+',
                        'Й','' ,'Ц','' ,'У','' ,'К','' ,'Е','' ,'Н','' ,'Г','' ,'Ш','' ,'Щ' ,''  , 'З','', 'х','Х','ъ','Ъ','\\','/',
                        'Ф','' ,'Ы','' ,'В','' ,'А','' ,'П','' ,'Р','' ,'О','' ,'Л','' ,'Д' ,''  ,'ж' ,'Ж','э','Э',
                        'Я','' ,'Ч','' ,'С','' ,'М','' ,'И','' ,'Т','' ,'Ь','' ,'б','Б','ю','Ю','.',','];

 romanianKeys:string[]=['„','”','1','!','2','@','3','#','4','$','5','%','6','^','7','&','8','*', '9','(','0',')', '-','_','=','+',
                        'Q','','W','','E','','R','','T','','Y','','U','','I','','O' ,'', 'P','', 'ă','Ă','î','Î','â','Â',
                        'A','','S','','D','','F','','G','','H','','J','','K','','L' ,'','ș','Ș','ț','Ț',
                        'Z','','X','','C','','V','','B','','N','','M','',',',':','.',':','\/','?'];




  keys: any;
  ngOnInit(): void {
    let lang = localStorage.getItem('language') == null ? 'English' : localStorage.getItem('language');
    switch (`${lang}`) {
      case 'English':
        this.keys = this.englishKeys;
        break;
      case 'Russian':
        this.keys = this.russianKeys;
        break;
      case 'Romanian':
        this.keys = this.romanianKeys;
        break;
      default:
        break;
    }
    this.fillInTheKeyboard();
    console.log(`KEYS ${lang}`);
    
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
      helpingHand(this.keyboard, letter, true, this.keys); 
    }
  } 

  async highlightError() {
    
    // console.log(this.keyboard.nativeElement.getElementById('key-1'));
    // console.log(document.getElementById('key-1'));
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

  fillInTheKeyboard() {
    console.log(this.keys.length);
    for(let i = 0; i < this.keys.length; i+=2) {
      document.getElementById(`key-${i/2+1}`)!.innerHTML = `${this.keys[i]}
                                                            <sup style="margin-left: ${this.keys[i+1] == '' ? 0 : 5}px;
                                                            vertical-align: super;
                                                            font-size: 13px;">
                                                            ${this.keys[i+1]}</sup>`;
      // console.log(`${i} - ${this.englishKeys[i]}
      //              ${i+1} - ${this.englishKeys[i+1]}`);
    }
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


function helpingHand(keyboard: ElementRef, nextLetter:string, flag: boolean, keys: string[]) {
  // console.log(keyboard.nativeElement);
 
    switch (nextLetter) {
      // I
      case keys[2]:
        keyboard.nativeElement.childNodes[0].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[15].classList.remove('hidden');
        break;
      case keys[3]:
        keyboard.nativeElement.childNodes[0].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[4]:
        keyboard.nativeElement.childNodes[0].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[16].classList.remove('hidden');
        break;
      case keys[5]:
        keyboard.nativeElement.childNodes[0].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[6]:
        keyboard.nativeElement.childNodes[0].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[17].classList.remove('hidden');
        break;
      case keys[7]:
        keyboard.nativeElement.childNodes[0].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[8]:
        keyboard.nativeElement.childNodes[0].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[18].classList.remove('hidden');
        break;
      case keys[9]:
        keyboard.nativeElement.childNodes[0].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[10]:
        keyboard.nativeElement.childNodes[0].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[19].classList.remove('hidden');
        break;
      case keys[11]:
        keyboard.nativeElement.childNodes[0].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[12]:
        keyboard.nativeElement.childNodes[0].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[20].classList.remove('hidden');
        break;
      case keys[13]:
        keyboard.nativeElement.childNodes[0].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[14]:
        keyboard.nativeElement.childNodes[0].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[21].classList.remove('hidden');
        break;
      case keys[15]:
        keyboard.nativeElement.childNodes[0].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[16]:
        keyboard.nativeElement.childNodes[0].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[22].classList.remove('hidden');
        break;
      case keys[17]:
        keyboard.nativeElement.childNodes[0].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[22].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[18]:
        keyboard.nativeElement.childNodes[0].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[23].classList.remove('hidden');
        break;
      case keys[19]:
        keyboard.nativeElement.childNodes[0].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[23].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[20]:
        keyboard.nativeElement.childNodes[0].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[24].classList.remove('hidden');
        break;
      case keys[21]:
        keyboard.nativeElement.childNodes[0].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[24].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[22]:
        keyboard.nativeElement.childNodes[0].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[25].classList.remove('hidden');
        break;
      case keys[23]:
        keyboard.nativeElement.childNodes[0].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[25].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[24]:
        keyboard.nativeElement.childNodes[0].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[26].classList.remove('hidden');
        break;
      case keys[25]:
        keyboard.nativeElement.childNodes[0].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[0].childNodes[26].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;


      // II
      case keys[26].toLowerCase():
        console.log("lllllll;l;  " + keys[26].toLowerCase());
        keyboard.nativeElement.childNodes[1].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[14].classList.remove('hidden');
        break;
      case keys[26]:
        keyboard.nativeElement.childNodes[1].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[14].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[28].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[15].classList.remove('hidden');
        break;
      case keys[28]:
        keyboard.nativeElement.childNodes[1].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[30].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[16].classList.remove('hidden');
        break;
      case keys[30]:
        keyboard.nativeElement.childNodes[1].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[32].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[17].classList.remove('hidden');
        break;
      case keys[32]:
        keyboard.nativeElement.childNodes[1].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[34].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[18].classList.remove('hidden');
        break;
      case keys[34]:
        keyboard.nativeElement.childNodes[1].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[36].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[19].classList.remove('hidden');
        break;
      case keys[36]:
        keyboard.nativeElement.childNodes[1].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[38].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[20].classList.remove('hidden');
        break;
      case keys[38]:
        keyboard.nativeElement.childNodes[1].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[40].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[21].classList.remove('hidden');
        break;
      case keys[40]:
        keyboard.nativeElement.childNodes[1].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[42].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[22].classList.remove('hidden');
        break;
      case keys[42]:
        keyboard.nativeElement.childNodes[1].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[22].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[44].toLowerCase():
        keyboard.nativeElement.childNodes[1].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[23].classList.remove('hidden');
        break;
      case keys[44]:
        keyboard.nativeElement.childNodes[1].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[23].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[46]:
        keyboard.nativeElement.childNodes[1].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[24].classList.remove('hidden');
        break;
      case keys[47]:
        keyboard.nativeElement.childNodes[1].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[24].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[48]:
        keyboard.nativeElement.childNodes[1].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[25].classList.remove('hidden');
        break;
      case keys[49]:
        keyboard.nativeElement.childNodes[1].childNodes[12].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[25].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[50]:
        keyboard.nativeElement.childNodes[1].childNodes[13].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[26].classList.remove('hidden');
        break;
      case keys[51]:
        keyboard.nativeElement.childNodes[1].childNodes[13].classList.add('highlighted');
        keyboard.nativeElement.childNodes[1].childNodes[26].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      
      // III
      case keys[52].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[12].classList.remove('hidden');
        break;
      case keys[52]:
        keyboard.nativeElement.childNodes[2].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[12].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[54].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[13].classList.remove('hidden');
        break;
      case keys[54]:
        keyboard.nativeElement.childNodes[2].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[13].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[56].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[14].classList.remove('hidden');
        break;
      case keys[56]:
        keyboard.nativeElement.childNodes[2].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[14].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[58].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[15].classList.remove('hidden');
        break;
      case keys[58]:
        keyboard.nativeElement.childNodes[2].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[60].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[16].classList.remove('hidden');
        break;
      case keys[60]:
        keyboard.nativeElement.childNodes[2].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[62].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[17].classList.remove('hidden');
        break;
      case keys[62]:
        keyboard.nativeElement.childNodes[2].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[64].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[18].classList.remove('hidden');
        break;
      case keys[64]:
        keyboard.nativeElement.childNodes[2].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[66].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[19].classList.remove('hidden');
        break;
      case keys[66]:
        keyboard.nativeElement.childNodes[2].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[68].toLowerCase():
        keyboard.nativeElement.childNodes[2].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[20].classList.remove('hidden');
        break;
      case keys[68]:
        keyboard.nativeElement.childNodes[2].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[70]:
        keyboard.nativeElement.childNodes[2].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[21].classList.remove('hidden');
        break;
      case keys[71]:
        keyboard.nativeElement.childNodes[2].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[21].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[72]:
        keyboard.nativeElement.childNodes[2].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[22].classList.remove('hidden');
        break;
      case keys[73]:
        keyboard.nativeElement.childNodes[2].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[2].childNodes[22].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      
      // IV
      case keys[74].toLowerCase():
        keyboard.nativeElement.childNodes[3].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[12].classList.remove('hidden');
        break;
      case keys[74]:
        keyboard.nativeElement.childNodes[3].childNodes[1].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[12].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[76].toLowerCase():
        keyboard.nativeElement.childNodes[3].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[13].classList.remove('hidden');
        break;
      case keys[76]:
        keyboard.nativeElement.childNodes[3].childNodes[2].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[13].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[78].toLowerCase():
        keyboard.nativeElement.childNodes[3].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[14].classList.remove('hidden');
        break;
      case keys[78]:
        keyboard.nativeElement.childNodes[3].childNodes[3].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[14].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[80].toLowerCase():
        keyboard.nativeElement.childNodes[3].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[15].classList.remove('hidden');
        break;
      case keys[80]:
        keyboard.nativeElement.childNodes[3].childNodes[4].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[15].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[82].toLowerCase():
        keyboard.nativeElement.childNodes[3].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[16].classList.remove('hidden');
        break;
      case keys[82]:
        keyboard.nativeElement.childNodes[3].childNodes[5].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[16].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[11].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[22].classList.remove('hidden');
        break;
      case keys[84].toLowerCase():
        keyboard.nativeElement.childNodes[3].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[17].classList.remove('hidden');
        break;
      case keys[84]:
        keyboard.nativeElement.childNodes[3].childNodes[6].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[17].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[86].toLowerCase():
        keyboard.nativeElement.childNodes[3].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[18].classList.remove('hidden');
        break;
      case keys[86]:
        keyboard.nativeElement.childNodes[3].childNodes[7].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[18].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[88]:
        keyboard.nativeElement.childNodes[3].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[19].classList.remove('hidden');
        break;
      case keys[89]:
        keyboard.nativeElement.childNodes[3].childNodes[8].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[19].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[90]:
        keyboard.nativeElement.childNodes[3].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[20].classList.remove('hidden');
        break;
      case keys[91]:
        keyboard.nativeElement.childNodes[3].childNodes[9].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[20].classList.remove('hidden');
        keyboard.nativeElement.childNodes[3].childNodes[0].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[23].classList.remove('hidden');
        break;
      case keys[92]:
        keyboard.nativeElement.childNodes[3].childNodes[10].classList.add('highlighted');
        keyboard.nativeElement.childNodes[3].childNodes[21].classList.remove('hidden');
        break;
      case keys[93]:
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