import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient,
    private auth: AngularFireAuth) { }

  currentDate = new Date();

  baseUrl = 'http://localhost:3000/db';

  getData() {
    return this.http.get('http://localhost:3000/db')
  }

  serviceDeleteTask(id: number): Observable<any> {
    return this.http.delete('http://localhost:3000/userInfo/' + id)
  }

  servicePostTask(newItem: any): Observable<any> {
    return this.http.post('http://localhost:3000/userInfo/', newItem)
  }

  servicePatchTask(id: number, updateItem: any): Observable<any> {
    return this.http.patch('http://localhost:3000/userInfo/' + id, updateItem)
  }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password))
  }

  isLoggedIn() {

    return !!localStorage.getItem('token');
  }
  
}

type SignIn = {
  email: string;
  password: string;
}