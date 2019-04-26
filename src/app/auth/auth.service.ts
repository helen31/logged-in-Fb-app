import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

import { UserInterface } from '../shared/models/user.interface';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(userData: {username: string, password: string}) {
    const body = userData;
    return this.httpClient.post<UserInterface>(location.origin + '/api/v1/user/login', body);
  }

  register(userData: {username: string, email: string, password: string}) {
    const headers = new HttpHeaders();
    const formData = new FormData();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);

    return this.httpClient.post(location.origin + '/api/v1/user/register', formData, {headers});
  }

  setTokenToLst(token: string): void {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  getToken(): string {
    return this.token ? this.token : localStorage.getItem('token');
  }

  isLogin(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.clearLcSt();
  }

  clearLcSt(): void {
      localStorage.clear();
  }

}
