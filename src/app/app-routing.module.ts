import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';
import { TechnicianDeleteComponent } from './components/technician/technician-delete/technician-delete.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './components/customer/customer-delete/customer-delete.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'technicians', component: TechnicianListComponent },
      { path: 'technicians/create', component: TechnicianCreateComponent },
      { path: 'technicians/update/:id', component: TechnicianUpdateComponent },
      { path: 'technicians/delete/:id', component: TechnicianDeleteComponent },

      { path: 'customers', component: CustomerListComponent },
      { path: 'customers/create', component: CustomerCreateComponent },
      { path: 'customers/update/:id', component: CustomerUpdateComponent },
      { path: 'customers/delete/:id', component: CustomerDeleteComponent },

      { path: 'tickets', component: TicketListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
