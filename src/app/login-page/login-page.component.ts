import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  loginMessage!: any;
  loginMessage2!: any;

  constructor(private fb: FormBuilder, private router: Router, private serviceUserData: UserDataService) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginTest() {
    this.serviceUserData.signIn({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe(
      (next: any) => {
        localStorage.setItem('token', (next.user._delegate.accessToken));
        const userRole = this.serviceUserData.getUserRole();
        if (userRole === 'Admin') {
          this.router.navigate(['/main']);
        } else if (userRole === 'User') {
          this.router.navigate(['/user_main']);
        }
      },
      (error: any) => {
        this.loginMessage = "The Login Credentials are incorrect! Please try again.";
        this.loginMessage2 = "ERROR MESSAGE: " + error;
        setTimeout(() => {
          this.loginMessage = "";
          this.loginMessage2 = "";
        }, 10000);
    })
  }

}
