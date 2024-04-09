import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CREATE_USER } from '../qraphql.queries/graphql.user.queries';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], 
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    public router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  backToHome() {
    this.router.navigate(['/']);
  }

  register() {
    if (this.registerForm.valid) {
      this.apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          id: this.registerForm.value.id,
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
        },
      }).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => console.error(`Registration error: ${error}`),
      });
    }
  }
}