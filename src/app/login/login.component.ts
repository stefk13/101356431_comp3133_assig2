import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], // Ensure ReactiveFormsModule is imported here
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.id, this.loginForm.value.password).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (error) => {
   
          if (error.networkError) {
            console.error(`Network error: ${error.networkError.message}`);
          }
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            error.graphQLErrors.forEach((graphQLError: { message: any; }) => {
              console.error(`GraphQL error: ${graphQLError.message}`);
            });
          }
          if (!error.networkError && !error.graphQLErrors) {
            console.error(`Unexpected error during login: ${error.message}`);
          }
        },
      });
    }
}

  backToHome() {
    this.router.navigate(['/']);
  }

}
