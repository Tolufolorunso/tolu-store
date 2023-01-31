import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../contant';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  token: string = localStorage.getItem('token') || '';
  isLogin: boolean = false;
  // user: User = JSON.parse(localStorage.getItem('user') || '') || null;

  // usertoken = new BehaviorSubject<string>('');
  // loggedInUser = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {}

  register(data: User): Observable<{}> {
    return this.http.post<User>(`${API_URL}/auth/register`, data);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${API_URL}/auth/login`, {
      username,
      password,
    });
  }

  getUser() {
    return {
      token: localStorage.getItem('token'),
      //@ts-ignore
      user: JSON.parse(localStorage.getItem('user')),
    };
  }
}
