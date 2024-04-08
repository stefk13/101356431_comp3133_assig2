import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddUpdateEmployeeComponent } from './add-update-employee/add-update-employee.component'; 

export const routes: Routes = [  
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employee/add', component: AddUpdateEmployeeComponent }, 
  { path: 'employee/edit/:id', component: AddUpdateEmployeeComponent }, 

];