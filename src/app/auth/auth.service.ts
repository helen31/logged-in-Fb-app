import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import { UserInterface } from '../shared/models/user.interface';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(userData: {username: string, password: string}) {
    const body = userData;
    return this.httpClient.post<UserInterface>(location.origin + '/api/v1/user/login', body).pipe(
        map(res => res.result)
    );
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
    localStorage.removeItem('token'); // todo web-storage-service???
  }
}
