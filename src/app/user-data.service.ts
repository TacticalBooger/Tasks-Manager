import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient,
    private auth: AngularFireAuth) { }

  personLoggedIn = '';
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

  getUserRole(): string | null { //checks if log in is USER or ADMIN
    let undecodedToken: any = localStorage.getItem('token');
    if (!undecodedToken) {
      return null;
    }
    let decodedToken: any = jwt_decode(undecodedToken);
    let currentLogIn = decodedToken.email;

    const adminEmails = ["admin-"]; 
    const userEmails = ["user-"]; 

    if (currentLogIn.includes(adminEmails)) {
      return 'Admin';
    }
    if (currentLogIn.includes(userEmails)) {
      return 'User';
    }
    return null;
  }

  isLoggedIn() { //check for authguard to make sure user is authenticated

    let currentDate = new Date();
    let undecodedToken: any = localStorage.getItem('token');
    if (!undecodedToken) {
      return false
    }
    let decodedToken: any = jwt_decode(undecodedToken);
    let convertedDate = new Date(decodedToken.exp * 1000);
    let currentLogIn = decodedToken.email;
    if (currentLogIn) {
      this.personLoggedIn = currentLogIn.split(/[-@]/);
    }
    if (currentDate < convertedDate) {
      return true;
    }
    return false;
  }

}

type SignIn = {
  email: string;
  password: string;
}