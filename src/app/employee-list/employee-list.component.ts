import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { EmployeeService } from '../service/employee.data.service';
import { Country } from '../service/country';
import { NgbdSortableHeader, SortEvent } from '../service/sortable.directive';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { Ng2OrderModule } from 'ng2-order-pipe';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService, DecimalPipe]
})
export class EmployeeListComponent implements OnInit {

  total$: Observable<number>;
  employees$: Observable<any>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: EmployeeService, private apiService: ApiService, private router: Router) {
    // this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.employees$ = apiService.getEmployee();
    // this.apiService$ = apiService;

  }

  // key: string = 'FirstName'; //set default
  // reverse: boolean = false;
  
  // sort(key) {
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }

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

  ngOnInit() {

  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }
  editEmployee(emp): void {
    console.log('I am in Edit function ');
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", emp.id.toString());
    this.router.navigate(['edit-user']);
  }
  deleteEmployee(emp): void {
    this.apiService.deleteUser(emp.id).subscribe(data => {
      //this.employees$ = this.employees$.filter(u => u !== user);
      this.employees$ = this.apiService.getEmployee();
    })
  }
}
