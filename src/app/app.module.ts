import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouteModule } from './app-route.module'

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { CountryService } from './service/data.service';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';

import { NgbModal, NgbHighlight, NgbPagination } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent, EmployeeListComponent, ManagerListComponent,NgbHighlight
  ],
  imports: [
    BrowserModule,
    AppRouteModule,
    SharedModule,
    FormsModule
  ],
  entryComponents:[NgbPagination],
  providers: [CountryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
