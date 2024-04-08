import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as EmployeeQueries from '../qraphql.queries/graphql.employee.queries';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [],
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];

  constructor(private apollo: Apollo, 
              private authService: AuthService, 
              private router: Router,) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.apollo.watchQuery({
      query: EmployeeQueries.GET_EMPLOYEES,
    }).valueChanges.subscribe((result: any) => {
      this.employees = result?.data?.getEmployees;
    });
  }

  deleteEmployee(id: string) {
    this.apollo.mutate({
      mutation: EmployeeQueries.DELETE_EMPLOYEE,
      variables: { id }
    }).subscribe(() => {
      this.getEmployees(); 
    });
  }

}