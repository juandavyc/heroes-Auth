//aservice snippet
import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl: string = enviroments.baseUrl;
  private user: User | undefined;

  constructor(private httpClient: HttpClient) {

  }

  get currentUser(): User | undefined {
    // nan 0 false null undefined
    if (!this.user) return undefined;
    return structuredClone(this.user); // deep clone
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user =>  !!user), // !!user
        catchError(err => of(false))
      )
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap((user) => this.user = user),
        tap((user) => localStorage.setItem('token', '4adfgadg3.fpoxwe.rrt748d7')),
      )
  }



  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
  getRoles() {
    return ["ROLE_ADMIN","ROLE_JUAN"];
  }

}
