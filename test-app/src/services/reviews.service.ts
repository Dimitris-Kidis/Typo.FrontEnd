import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReviewCommand } from 'src/commands/Reviews/CreateReviewCommand';
import { Review } from 'src/models/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpService: HttpClient) { }

  // POST
  createReview(command: CreateReviewCommand): Observable<any> {
    return this.httpService.post<any>("api/reviews", command);
  }

  // GET
  getAllReviews(): Observable<Review[]> {
    return this.httpService.get<Review[]>("api/reviews/all-reviews");
  }
}
