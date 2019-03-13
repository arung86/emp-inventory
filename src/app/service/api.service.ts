import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../service/country';
import {employees} from '../service/employee';
import { Observable, of, Subject } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  configUrl = 'http://localhost:3000/employees';
  constructor(private http: HttpClient) { }
  getEmployee() {
    return this.http.get(this.configUrl);
  }

  /*getEmployeeArray():Observable<employees[]>{
    return this.http.get<employees[]>(this.configUrl);
  }*/
  getEmployeeArray(){
    return this.http.get<employees[]>(this.configUrl);
      
  }
  getEmployeeById(id: number) {
    return this.http.get(this.configUrl + '/' + id);
  }
  updateEmployee(user: Country) {
    return this.http.put(this.configUrl + '/' + user.id, user);
  }

  createUser(user: Country) {
    return this.http.post(this.configUrl, user);
  }
  deleteUser(id: number) {
    return this.http.delete(this.configUrl + '/' + id);
  }
}


