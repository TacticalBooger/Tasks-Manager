import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.component.html',
  styleUrls: ['./admin-tools.component.css']
})
export class AdminToolsComponent {

  constructor(private router: Router) {

  }

  admin_takeToAddTask() {
    this.router.navigate(['/admin_addTask'])
  }

}
