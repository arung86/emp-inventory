import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouteModule } from './app-route.module';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { CountryService } from './service/data.service';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms'
import { NgbModal, NgbHighlight, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './service/sortable.directive';
import { ApiService} from './service/api.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { Ng2OrderModule } from 'ng2-order-pipe'; 


@NgModule({
  declarations: [
    AppComponent, EmployeeListComponent, ManagerListComponent, NgbHighlight, NgbdSortableHeader, EditUserComponent, AddUserComponent, DeleteUserComponent
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2OrderModule
  ],
  entryComponents: [NgbPagination],
  providers: [CountryService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
