import { Component, QueryList, Directive, EventEmitter, Input, Output, ViewChildren } from '@angular/core';

import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { CountryService } from '../service/data.service';
import { Country } from '../service/country';
import { NgbdSortableHeader, SortEvent } from '../service/sortable.directive';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class ManagerListComponent {

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}


