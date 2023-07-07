import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us-user',
  templateUrl: './about-us-user.component.html',
  styleUrls: ['./about-us-user.component.css']
})
export class AboutUsUserComponent {

  constructor(private router: Router){

  }

  takeToMainTask() { //simple button to go back to main
    this.router.navigate(['/user_main'])
  }

}