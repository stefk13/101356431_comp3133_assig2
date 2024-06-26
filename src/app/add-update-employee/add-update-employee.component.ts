import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import * as EmployeeQueries from '../qraphql.queries/graphql.employee.queries';


@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], 
})
export class AddUpdateEmployeeComponent implements OnInit {
  employeeForm: FormGroup; 
  isUpdate: boolean = false;
  employeeId: string | null = null;

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    public router: Router,
    public authService: AuthService
  ) {

    this.employeeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]]
    });
  }
  fetchEmployeeDetails(id: string): void {
    this.apollo.watchQuery({
      query: EmployeeQueries.GET_EMPLOYEE_BY_ID,
      variables: { _id: id },
    }).valueChanges.subscribe((result: any) => {
      if (result.data && result.data.getEmployeeByID) {
        this.employeeForm.patchValue(result.data.getEmployeeByID);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      const id = params['id']; 
      if (id) {
        this.isUpdate = true;
        this.employeeId = id;
        this.fetchEmployeeDetails(id);
      }
    });
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }

  backToEmployees(): void {
    this.router.navigate(['/employees']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }

  submitForm() {
    if (this.employeeForm.valid) {
      const operation = this.isUpdate ? EmployeeQueries.UPDATE_EMPLOYEE : EmployeeQueries.CREATE_EMPLOYEE;
      const variables = this.isUpdate ? { id: this.employeeId, ...this.employeeForm.value } : { ...this.employeeForm.value };

      this.apollo.mutate({
        mutation: operation,
        variables: variables,
      }).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (error) => alert(`Error processing employee: ${error.message}`),
      });
    }
  }
}
