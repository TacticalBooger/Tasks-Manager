import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-admin-tasklist',
  templateUrl: './admin-tasklist.component.html',
  styleUrls: ['./admin-tasklist.component.css']
})
export class AdminTasklistComponent implements OnInit {

  constructor(private serviceUserData: UserDataService) {

  }

  ngOnInit() {

  }

  userDataArray = this.serviceUserData.userInfo;

  deleteTask(i: number) {
    const val = confirm("Are you sure you want to delete this task?");
    if (val == true) {
      this.serviceUserData.serviceDeleteTask(i);
    }
  }

  completeTask(i: number) {
    var val = confirm("Are you sure you want to finish this task?");
    if (val == true) {
      this.serviceUserData.serviceCompleteTask(i);
    }
  }

  taskColor(userdata: any): string {
    return userdata.status === 'Completed' ? 'lightgreen' :
      userdata.status === 'In Progress' ? 'yellow' :
        userdata.status === 'Pending' ? 'grey' :
          userdata.status === 'Over Deadline' ? 'red' : ''
  }

  priorityColor(userdata: any): string {
    return userdata.priority === 'HIGH' ? 'red' :
      userdata.priority === 'MED' ? 'yellow' :
        userdata.priority === 'LOW' ? 'grey' : ''
  }

}
