import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {

  constructor(private router: Router, private serviceUserData: UserDataService) {
    
  }

  personLoggedIn = this.serviceUserData.personLoggedIn[1]
  
  logOut(){ //will completely clear any saved tokens on the browser
    localStorage.setItem('token', '');
    this.router.navigate(['/login_page'])
  }
  
}
