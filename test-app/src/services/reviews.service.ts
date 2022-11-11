import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReviewCommand } from 'src/commands/Reviews/CreateReviewCommand';
import { UpdateReviewCommand } from 'src/commands/Reviews/UpdateReviewCommand';
import { Review } from 'src/models/Review';
import { IReviewGridRow } from 'src/models/ReviewGridRow';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';

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

  getReviewById(id: number): Observable<Review> {
    return this.httpService.get<Review>(`api/reviews/${id}`);
  }

  getPagedReviews(paginatedRequest: PaginatedRequest): Observable<PagedResult<IReviewGridRow>> {
    console.log(paginatedRequest);
    return this.httpService.post<PagedResult<IReviewGridRow>>('api/reviews/paginated', paginatedRequest);
  }

  // DELETE
  deleteReviewById(id: number): Observable<any> {
    return this.httpService.delete<any>(`/api/reviews/${id}`);
  }

  // PUT
  updateReview(command: UpdateReviewCommand): Observable<any> {
    return this.httpService.put<any>("api/reviews", command);
  }
}
