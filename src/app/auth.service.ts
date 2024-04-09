import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { tap } from 'rxjs/operators';

const LOGIN_USER = gql`
  query Login($id: String!, $password: String!) {
    userLogin(_id: $id, password: $password) {
      _id
      email
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(id: string, password: string) {
    return this.apollo.query({
      query: LOGIN_USER,
      variables: {
        id,
        password,
      },
    }).pipe(
      tap((response: any) => {
        if (response.data?.userLogin.token) {
          this.saveToken(response.data.userLogin.token);
        }
      })
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('userToken');
  }
}
