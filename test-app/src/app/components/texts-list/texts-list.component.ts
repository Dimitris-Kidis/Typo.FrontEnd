import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UsersService } from 'src/services/users.service';
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
import { TextsService } from 'src/services/texts.service';
import { UpdateTextCommand } from 'src/commands/Texts/UpdateTextCommand';
import { CreateTextCommand } from 'src/commands/Texts/CreateTextCommand';
import { ITextGridRow } from 'src/models/TextGridRow';
import { Text } from '../../../models/Text'

@Component({
  selector: 'app-texts-list',
  templateUrl: './texts-list.component.html',
  styleUrls: ['./texts-list.component.scss']
})
export class TextsListComponent {

  pagedTexts: PagedResult<ITextGridRow>;


  tableColumns: TableColumn[] = [
    { name: 'textContent', index: 'textContent', displayName: 'Text', useInSearch: true},
    { name: 'author', index: 'author', displayName: 'Author', useInSearch: true},
    { name: 'level', index: 'level', displayName: 'Level'},
    { name: 'language', index: 'language', displayName: 'Language'},
    { name: 'id', index: 'id', displayName: 'Id' },
  ];

  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters: RequestFilters;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  constructor(
    private textService: TextsService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
  }

  ngAfterViewInit() {
    this.loadPagedTexts();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadPagedTexts();
    });
  }

  loadPagedTexts() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this.textService.getPagedTexts(paginatedRequest)
      .subscribe((pagedTexts: PagedResult<ITextGridRow>) => {
        this.pagedTexts = pagedTexts;
        console.log(this.pagedTexts);
      });
  }

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete', message: 'Are you sure you want to delete this item?' }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this.textService.deleteTextById(id).subscribe(
          () => {
            this.loadPagedTexts();

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
    this.loadPagedTexts();
  }

  resetGrid() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.loadPagedTexts();
  }

  filterTextsFromForm() {
    this.createFiltersFromForm();
    this.loadPagedTexts();
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


  pageTitle: string;
  public textForm: FormGroup;
  paginationFlag = true;
  textId: number;

  hidePagination(mode: string, id: number){
    this.paginationFlag = false;
    if (mode == 'Edit') {
      this.textId = id;
      console.log(id);
      
    
        this.getText(id);
      
      this.pageTitle = 'Edit'
    } else if (mode == 'Add') {
      this.pageTitle = 'Add'
    }
    this.editText(id);
  }

  editText(id: number) {
    this.textForm = new FormGroup({
      textContent: new FormControl("", [Validators.required,
                                      Validators.minLength(50),
                                      Validators.maxLength(500)]),
      author: new FormControl("", [Validators.required,
                                     Validators.minLength(3),
                                     Validators.maxLength(20)]),
      level: new FormControl("", [Validators.required]),
      language: new FormControl("", [Validators.required]),
    })

    
  }

  getText(id: number) {
    this.textService.getTextById(id).subscribe((text: Text) => {
      this.textForm.patchValue({
        textContent: text.textContent,
        author: text.author,
        level: text.level,
        language: text.language
      });
      this.textId = text.id;
    });
  }

  saveText(): void {
    if (this.textForm.dirty && this.textForm.valid) {
      if (this.pageTitle == 'Add') {
        const createUser: CreateTextCommand = {
          textContent: this.textForm.value.textContent,
          author: this.textForm.value.author,
          language: this.textForm.value.language,
          level: +this.textForm.value.level,
        }
        this.textService.createText(createUser).subscribe(
          () => this.onSaveComplete()
        );



      } else if (this.pageTitle == 'Edit') {
        console.log('lllll');
        const updateUser: UpdateTextCommand = {
          id: this.textId,
          textContent: this.textForm.value.textContent,
          author: this.textForm.value.author,
          language: this.textForm.value.language,
          level: +this.textForm.value.level,
        };
        this.textService.updateText(updateUser).subscribe(
          () => this.onSaveComplete()
        );
      }
        

       
    }
  }


  onSaveComplete(): void {
    // this.textForm.reset();
    window.location.reload();
    // this.router.navigate(['/typo/account']);
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