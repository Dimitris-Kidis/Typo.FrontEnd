import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { TableColumn } from 'src/models/TableColumn';
import { IUserGridRow, User } from 'src/models/User';
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

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  pagedUsers: PagedResult<IUserGridRow>;


  tableColumns: TableColumn[] = [
    { name: 'firstName', index: 'firstName', displayName: 'FirstName', useInSearch: true},
    { name: 'lastName', index: 'lastName', displayName: 'LastName', useInSearch: true},
    { name: 'email', index: 'email', displayName: 'Email', useInSearch: true},
    { name: 'avatar', index: 'avatar', displayName: 'Avatar'},
    { name: 'age', index: 'age', displayName: 'Age'},
    { name: 'gender', index: 'gender', displayName: 'Gender'},
    { name: 'isAdmin', index: 'isAdmin', displayName: 'Admin'},
    { name: 'id', index: 'id', displayName: 'Id' },
  ];

  displayedColumns: string[];

  searchInput = new FormControl('');
  filterForm: FormGroup;

  requestFilters: RequestFilters;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;

  constructor(
    private _userService: UsersService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.displayedColumns = this.tableColumns.map(column => column.name);
  }

  ngAfterViewInit() {
    this.loadPagedUsers();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page).subscribe(() => {
      this.loadPagedUsers();
    });
  }

  loadPagedUsers() {
    const paginatedRequest = new PaginatedRequest(this.paginator, this.sort, this.requestFilters);
    this._userService.getPagedUsers(paginatedRequest)
      .subscribe((pagedUsers: PagedResult<IUserGridRow>) => {
        this.pagedUsers = pagedUsers;
        console.log(this.pagedUsers);
      });
  }

  deleteDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Delete', message: 'Are you sure you want to delete this item?' }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      if (result === dialogRef.componentInstance.ACTION_CONFIRM) {
        this._userService.deleteUserById(id).subscribe(
          () => {
            this.loadPagedUsers();

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
    this.loadPagedUsers();
  }

  resetGrid() {
    this.requestFilters = {filters: [], logicalOperator: FilterLogicalOperators.And};
    this.loadPagedUsers();
  }

  filterUsersFromForm() {
    this.createFiltersFromForm();
    this.loadPagedUsers();
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
  test (id: number){
    console.log(id);
  }
  pageTitle: string;
  public userForm: FormGroup;
  paginationFlag = true;
  userId: number;
  pass: string;

  hidePagination(mode: string, id: number){
    this.paginationFlag = false;
    if (mode == 'Edit') {
      this.userId = id;
      console.log(id);
      
    
        this.getUser(id);
      
      this.pageTitle = 'Edit'
    } else if (mode == 'Add') {
      this.pageTitle = 'Add'
      
    }
    this.editUser(id);
  }

  editUser(id: number) {
    this.userForm = new FormGroup({
      firstName: new FormControl("", [Validators.required,
                                      noNumbersCharsSpaces,
                                      Validators.minLength(2),
                                      Validators.maxLength(30)]),
      lastName: new FormControl("", [Validators.required,
                                     noNumbersCharsSpaces,
                                     Validators.minLength(2),
                                     Validators.maxLength(30)]),
      email: new FormControl("", [Validators.required,
                                  Validators.email,
                                  Validators.minLength(5),
                                  Validators.maxLength(30)]),
      password: new FormControl("", [Validators.required,
                                     Validators.minLength(8),
                                     Validators.maxLength(20),
                                     lowercaseLetterCheck,
                                     uppercaseLetterCheck,
                                     digitCheck,
                                     specialCharCheck]),
      age: new FormControl("", [Validators.required,
                                ageRange,
                                noLettersAllowed]),
      gender: new FormControl("", [Validators.required]),
      isAdmin: new FormControl("", [Validators.required]),
    })
    if (this.pageTitle == 'Edit') {
      this.userForm.patchValue({
        password: 'vU78*8uj8(KJ'
      });
    }
    
  }

  getUser(id: number) {
    this._userService.getUserById(id).subscribe((user: User) => {
      this.userForm.patchValue({
        isAdmin: user.isAdmin,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        password: user.password,
        gender: user.gender
        // ...user
      });
      this.userId = user.id;
      this.pass = user.password;
    });
  }

  saveUser(): void {
    if (this.userForm.dirty && this.userForm.valid) {
      if (this.pageTitle == 'Add') {
        const createUser: CreateUserCommand = {
          ...this.userForm.value
        }
        if (`${createUser.isAdmin}` == 'true') {
          createUser.isAdmin = true;
        } else {
          createUser.isAdmin = false;
        }
        console.log(typeof createUser.isAdmin + '  ' + createUser.isAdmin);
        this._userService.createUser(createUser).subscribe(
          () => this.onSaveComplete()
        );



      } else if (this.pageTitle == 'Edit') {
        console.log('lllll');
        console.log(this.userForm.value);
        const updateUser: UpdateUserCommand = {
          id: this.userId,
          password: this.pass,
          ...this.userForm.value,

        };
        this._userService.updateUser(updateUser).subscribe(
          () => this.onSaveComplete()
        );
      }
        

       
    }
  }


  onSaveComplete(): void {
    // this.userForm.reset();
    window.location.reload();
    // this.router.navigate(['/typo/account']);
  }

  refresh() {
    window.location.reload();
  }

}
