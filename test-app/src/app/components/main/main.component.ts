import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EventEmitterService } from './event-emitter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private eventEmitterService: EventEmitterService) {}

  @ViewChild('scroll') scroll: ElementRef;
  @ViewChild('main') main: HTMLElement;
  @ViewChild('results') results: ElementRef;
  finished: boolean = false;

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar3==undefined) {    
      this.eventEmitterService.subsVar3 = this.eventEmitterService.
      invokeFinishingFunction.subscribe((arr: any[]) => {    
        this.scrollToResults(arr);   
      }); 
    }
  }

  async scrollToResults(arr: any[]) {
    this.finished = true;
    await delay(1000);
    console.log(arr);
    window.scrollTo({
      top: 1000,
      left: 100,
      behavior: 'smooth'
    });
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}