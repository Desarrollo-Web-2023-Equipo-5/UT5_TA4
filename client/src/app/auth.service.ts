import { Injectable } from '@angular/core';
import { User } from './interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<User>('http://localhost:3000/api/login', body)
  }


  testEndpoint() {
    return this.http.get('http://localhost:3000/api/test');
  }
}
