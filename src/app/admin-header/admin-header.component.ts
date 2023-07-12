import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private router: Router, private serviceUserData: UserDataService) {
    
  }

  personLoggedIn = this.serviceUserData.personLoggedIn
  
  logOut(){
    localStorage.setItem('token', '');
    this.router.navigate(['/login_page'])
  }

}
