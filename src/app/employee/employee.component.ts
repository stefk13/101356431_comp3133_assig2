import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as EmployeeQueries from '../qraphql.queries/graphql.employee.queries';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];

  constructor(private apollo: Apollo, 
              public authService: AuthService, 
              public router: Router,) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.apollo.watchQuery({
      query: EmployeeQueries.GET_EMPLOYEES,
    }).valueChanges.subscribe((result: any) => {
      console.log("Loaded employees:", result?.data?.getEmployees);
      this.employees = result?.data?.getEmployees;
    });
  }

  deleteEmployee(id: string) {

    console.log("Attempting to delete employee with ID:", id);
    console.log("Variables passed:", { _id: id });
    this.apollo.mutate({
      mutation: EmployeeQueries.DELETE_EMPLOYEE,
      variables: { _id: id } 
    }).subscribe({
      next: (response) => {
        console.log("Employee deleted successfully. Response:", response);
        this.getEmployees();
      },
      error: (error) => {
        console.error("Error deleting employee. Error details:", error);
        console.error("Failed ID:", id); 
      }
    });
  }

}