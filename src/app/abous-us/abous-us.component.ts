import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abous-us',
  templateUrl: './abous-us.component.html',
  styleUrls: ['./abous-us.component.css']
})
export class AbousUsComponent {

  constructor(private router: Router){

  }

  takeToMainTask() { //simple button to go back to main
    this.router.navigate(['/main'])
  }

}
