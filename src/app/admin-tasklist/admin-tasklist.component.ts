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

  edit_subject!: any
  edit_priority!: any
  edit_start_date!: any
  edit_end_date!: any
  edit_assignedTo!: any
  edit_department!: any
  editMessage = ""
  index!: number
  editTaskActive: boolean = false

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

  editTask(i: number) {
    this.editTaskActive = true
    this.edit_subject = this.userDataArray[i].subject;
    this.edit_priority = this.userDataArray[i].priority;
    this.edit_start_date = this.userDataArray[i].start_date;
    this.edit_end_date = this.userDataArray[i].finish_date;
    this.edit_assignedTo = this.userDataArray[i].assignedTo;
    this.edit_department = this.userDataArray[i].department;
    this.index = i
  }

  editTaskFinal() {
    this.userDataArray[this.index].subject = this.edit_subject
    this.userDataArray[this.index].priority = this.edit_priority
    this.userDataArray[this.index].assignedTo = this.edit_assignedTo
    this.userDataArray[this.index].department = this.edit_department

    this.editMessage = "Task Updated!"
    setTimeout (() => {
      this.editMessage = "";
    }, 2500);
  }

  backToList(){
    this.editTaskActive = false
  }

}
