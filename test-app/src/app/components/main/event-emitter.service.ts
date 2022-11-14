import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeKeyboardFunction = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  passToKeyboard(letter: string) {    
    this.invokeKeyboardFunction.emit(letter);    
  }   
}
