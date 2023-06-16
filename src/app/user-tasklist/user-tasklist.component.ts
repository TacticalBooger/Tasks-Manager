import { Component } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-tasklist',
  templateUrl: './user-tasklist.component.html',
  styleUrls: ['./user-tasklist.component.css']
})
export class UserTasklistComponent {

  constructor (private userData: UserDataService) {

  }

  userDataArray = this.userData.userInfo;

}
