import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ManagerListComponent } from './manager-list/manager-list.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeListComponent,
    data: { title: 'Employee List' }
  },
  {
    path: 'manager',
    component: ManagerListComponent,
    data: { title: 'manager List' }
  },
  {
    path: '',
    redirectTo: '/employee',
    pathMatch: 'full'
  },
  { path: '**', component: EmployeeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRouteModule { }
