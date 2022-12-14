import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RequestFilters } from './RequestFilters';

export class PaginatedRequest {
    pageIndex: number;
    pageSize: number;
    columnNameForSorting: string;
    sortDirection: string;
    requestFilters: object;

    constructor(paginator: MatPaginator, sort: MatSort, filters: RequestFilters) {
        this.pageIndex = paginator.pageIndex;
        this.pageSize = paginator.pageSize;
        this.columnNameForSorting = sort.active;
        this.sortDirection = sort.direction;            
        this.requestFilters = filters;
    }
//     constructor(pageIndex: number, pageSize: number, columnNameForSorting: string, sortDirection: string ) {
//         this.pageIndex = pageIndex;
//         this.pageSize = pageSize;
//         this.columnNameForSorting = columnNameForSorting;
//         this.sortDirection = sortDirection;
//         this.requestFilters = {};
// }

}

