import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateReviewCommand } from 'src/commands/Reviews/CreateReviewCommand';
import { AuthenticationService } from 'src/services/authentification.service';
import { ReviewsService } from 'src/services/reviews.service';
import { EventEmitterService } from './event-emitter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(private _eventEmitterService: EventEmitterService,
    private _reviewService: ReviewsService,
    private _authService: AuthenticationService,
    private _router: Router) {}

  @ViewChild('scroll') scroll: ElementRef;
  @ViewChild('main') main: HTMLElement;
  @ViewChild('results') results: ElementRef;
  @ViewChild('resultText') resultText: ElementRef;
  @ViewChild('reviewInput') reviewInput: ElementRef;
  finished: boolean = false;
  speed: number;
  accuracy: number;
  time: string;
  userId: number;
  textId: number;
  reviewSent: boolean = false;
  goToReview: boolean = false;

  reviewForm!: FormGroup;

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) this._router.navigate(['/typo/login']);
    this.userId = this._authService.getUserId();
    this.reviewForm = new FormGroup({
      review: new FormControl("", [Validators.required,
                                     Validators.minLength(50),
                                     Validators.maxLength(300)]),
    })



    if (this._eventEmitterService.subsVar3==undefined) {    
      this._eventEmitterService.subsVar3 = this._eventEmitterService.
      invokeFinishingFunction.subscribe((arr: any[]) => {    
        this.scrollToResults(arr);   
      }); 
    }
  }

  async scrollToResults(arr: any[]) {
    this.speed = arr[0];
    this.accuracy = arr[1];
    this.time = arr[2];
    this.textId = arr[4];
    this.finished = true;
    await delay(1000);
    this.resultText.nativeElement.innerHTML = arr[3];
    // console.log(arr, this.resultText.nativeElement)
    console.log(arr);
    window.scrollTo({
      top: 1000,
      left: 100,
      behavior: 'smooth'
    });
  }

  leaveReview() {
    this.goToReview = true;
    setTimeout(() => {
      window.scrollTo({
        top: 1000,
        left: 100,
        behavior: 'smooth'
      });
    }, 300);
  }

  submitReview = (reviewFormValue: any) => {
    if (this.reviewSent) return;
    this.reviewInput.nativeElement.setAttribute('readonly', 'readonly');
    const createReview: CreateReviewCommand = {
      reviewContent: reviewFormValue.review,
      userId: this.userId,
      textId: this.textId
    };
    this._reviewService.createReview(createReview).subscribe();
    this.reviewSent = true;
  }

 















}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}