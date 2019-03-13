import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { employees } from './employee';
//import { COUNTRIES } from './countries';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from './sortable.directive';
import { ApiService } from '../service/api.service';


interface SearchResult {
    empl: employees[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

function compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(empl: employees[], column: string, direction: string): employees[] {
    if (direction === '') {
        return empl;
    } else {
        return [...empl].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/* function export() {
    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(COUNTRIES, 'My Report');
}; */


function matches(empl: employees, term: string, pipe: PipeTransform) {
    return empl.email.toLowerCase().includes(term)
        || pipe.transform(empl.first_name).includes(term)
        || pipe.transform(empl.last_name).includes(term);
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<any>();
    private _employee$ = new BehaviorSubject<employees[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: State = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe, private apiservice:ApiService) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._employee$.next(result['empl']);
            this._total$.next(result['total']);
        });

        this._search$.next();
    }

    get employee$() { return this._employee$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        //private apiservice = newApiService();
        let empl = [];
       
         this.apiservice.getEmployeeArray().subscribe(empl => {
            empl = empl as employees[]
        });
        // 1. sort
        empl = sort(empl, sortColumn, sortDirection);

        // 2. filter
        empl = empl.filter(country => matches(country, searchTerm, this.pipe));
        const total = empl.length;

        // 3. paginate
        empl = empl.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ empl, total });
    }
}
