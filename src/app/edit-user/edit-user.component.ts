import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Country } from '../service/country';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../service/api.service'
import {first } from 'rxjs/operators';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  country: Country;
  editForm: FormGroup;

  
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    let userId = localStorage.getItem('editUserId');
    console.log('userId'+userId);
    if(!userId) {
      alert('Invalid action.')
      this.router.navigate(['employee-list']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required]
     
    });
    
    console.log('Form buildup');
    this.apiService.getEmployeeById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.apiService.updateEmployee(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['employee-list']);
        },
        error => {
          alert(error);
        });
  }

}
