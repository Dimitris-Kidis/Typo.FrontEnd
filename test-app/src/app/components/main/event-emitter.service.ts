import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeKeyboardFunction = new EventEmitter();    
  invokeBackspaceFunction = new EventEmitter();    
  invokeFinishingFunction = new EventEmitter();    
  subsVar: Subscription;    
  subsVar2: Subscription;    
  subsVar3: Subscription;    
    
  constructor() { }    
    
  passToKeyboard(letter: string) {    
    this.invokeKeyboardFunction.emit(letter);    
  }   

  invokeBackspace() {    
    this.invokeBackspaceFunction.emit();    
  }

  finished(results: any[]) {    
    this.invokeFinishingFunction.emit(results);    
  } 
}
