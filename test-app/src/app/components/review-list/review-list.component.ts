import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { TableColumn } from 'src/models/TableColumn';
import { Filter } from 'src/pagination/Filter';
import { FilterLogicalOperators } from 'src/pagination/FilterLogicalOperators';
import { PagedResult } from 'src/pagination/PagedResult';
import { PaginatedRequest } from 'src/pagination/PaginatedRequest';
import { RequestFilters } from 'src/pagination/RequestFilters';
import { ConfirmDialogComponent } from 'src/shared/confirm-dialog.component';

import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ageRange, digitCheck, lowercaseLetterCheck, nameLength, noLettersAllowed, noNumbersCharsSpaces, specialCharCheck, uppercaseLetterCheck } from 'src/shared/form-validators';
import { CreateUserCommand } from 'src/commands/Users/CreateUserCommand';
import { UpdateUserCommand } from 'src/commands/Users/UpdateUserCommand';
import { IReviewGridRow } from 'src/models/ReviewGridRow';
import { ReviewsService } from 'src/services/reviews.service';
import { Review } from 'src/models/Review';
import { CreateReviewCommand } from 'src/commands/Reviews/CreateReviewCommand';
import { UpdateReviewCommand } from 'src/commands/Reviews/UpdateReviewCommand';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent {

  pagedReviews: PagedResult<IReviewGridRow>;


  tableColumns: TableColumn[] = [
    { name: 'textContent', index: 'textContent', displayName: 'Text', useInSearch: true},
    { name: 'reviewContent', index: 'reviewContent', displayName: 'Review', useInSearch: true},
    { name: 'userEmail', index: 'userEmail', displayName: 'Author', useInSearch: true},
    { name: 'id', index: 'id', displayName: 'Id' },
  ];

  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters: RequestFilters;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  constructor(
    private _reviewsService: ReviewsService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
  }

  ngAfterViewInit() {
    this.loadPagedReviews();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadPagedReviews();
    });
  }

  loadPagedReviews() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this._reviewsService.getPagedReviews(paginatedRequest)
      .subscribe((pagedReviews: PagedResult<IReviewGridRow>) => {
        this.pagedReviews = pagedReviews;
        console.log(this.pagedReviews);
      });
  }

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete', message: 'Are you sure you want to delete this item?' }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this._reviewsService.deleteReviewById(id).subscribe(
          () => {
            this.loadPagedReviews();

            this.snackBar.open('The item has been deleted successfully.', 'Close', {
              duration: 1500
            });
          }
        );
      }
    });

  }

  applySearch() {
    this.createFiltersFromSearchInput();
    this.loadPagedReviews();
  }

  resetGrid() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.loadPagedReviews();
  }

  filterBooksFromForm() {
    this.createFiltersFromForm();
    this.loadPagedReviews();
  }

  private createFiltersFromForm() {
    if (this.filterForm.value) {
      const filters: Filter[] = [];

      Object.keys(this.filterForm.controls).forEach(key => {
        const controlValue = this.filterForm.controls[key].value;
        if (controlValue) {
          const foundTableColumn = this.tableColumns.find(tableColumn => tableColumn.name === key);
          const filter: Filter = { path : foundTableColumn!.index, value : controlValue }; // добавил !
          filters.push(filter);
        }
      });

      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.And,
        filters
      };
    }
  }

  private createFiltersFromSearchInput() {
    const filterValue = this.searchInput.value!.trim(); // добавил !
    if (filterValue) {
      const filters: Filter[] = [];
      this.tableColumns.forEach(column => {
        if (column.useInSearch) {
          const filter: Filter = { path : column.index, value : filterValue };
          filters.push(filter);
        }
      });
      this.requestFilters = {
        logicalOperator: FilterLogicalOperators.Or,
        filters
      };
    } else {
      this.resetGrid();
    }
  }

  // -------------------

  pageTitle: string;
  public reviewForm: FormGroup;
  paginationFlag = true;
  reviewId: number;

  hidePagination(mode: string, id: number){
    this.paginationFlag = false;
    if (mode == 'Edit') {
      this.reviewId = id;
      console.log(id);
      
    
        this.getReview(id);
      
      this.pageTitle = 'Edit'
    } else if (mode == 'Add') {
      this.pageTitle = 'Add'
    }
    this.editReview(id);
  }

  editReview(id: number) {
    this.reviewForm = new FormGroup({
      reviewContent: new FormControl("", [Validators.required,
                                      Validators.minLength(50),
                                      Validators.maxLength(300)]),
      textId: new FormControl("", [Validators.required,
                                noLettersAllowed]),
      userId: new FormControl("", [Validators.required,
                                  noLettersAllowed]),
    })

    
  }

  getReview(id: number) {
    this._reviewsService.getReviewById(id).subscribe((rev: Review) => {
      this.reviewForm.patchValue({
        reviewContent: rev.reviewContent,
        textId: rev.textId,
        userId: rev.userId
      });
      this.reviewId = rev.id;
    });
  }

  @ViewChild('invalid') errorMessage!: ElementRef;
  saveReview(): void {
    if (this.reviewForm.dirty && this.reviewForm.valid) {
      if (this.pageTitle == 'Add') {
        const createReview: CreateReviewCommand = {
          ...this.reviewForm.value
        }
        this._reviewsService.createReview(createReview).subscribe({
          next: () => {
            this.onSaveComplete();
          },
          error:
            async () => {
              console.log('eerrr');
              await changeContent(this, 'Invalid text id or user id.');
              await delay(5000);
              await changeContent(this, '');
            }
        });



      } else if (this.pageTitle == 'Edit') {
        console.log('lllll');
        const updateReview: UpdateReviewCommand = {
          id: this.reviewId,
          ...this.reviewForm.value
        };

        this._reviewsService.updateReview(updateReview).subscribe({
          next: () => {
            this.onSaveComplete();
          },
          error:
            async () => {
              console.log('eerrr');
              await changeContent(this, 'Invalid text id or user id.');
              await delay(5000);
              await changeContent(this, '');
            }
        });
      }
        

       
    }
  }

  onSaveComplete(): void {
    window.location.reload();
  }

  refresh() {
    window.location.reload();
  }

}


function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.errorMessage.nativeElement.innerHTML = `${content}`;
}