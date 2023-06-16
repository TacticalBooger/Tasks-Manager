import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-addtask',
  templateUrl: './admin-addtask.component.html',
  styleUrls: ['./admin-addtask.component.css']
})
export class AdminAddtaskComponent {

  currentDate = new Date();

  constructor(private serviceUserData: UserDataService) {

  }
  addedMessage!: string
  taskSubject!: string
  taskDescription!: string
  taskPriority!: string
  taskDepartment!: string
  taskAssignedTo!: string

  addTaskArray:any = {}

  addTask() {
    this.addTaskArray =
      {
    subject: this.taskSubject,
    priority: this.taskPriority,
    start_date: this.currentDate,
    finish_date: this.currentDate,
    department: this.taskDepartment,
    assignedTo: this.taskAssignedTo,
    status: "HIGH"
      }

    this.serviceUserData.userInfo.push(this.addTaskArray);

    this.addedMessage = "Task Added!"
    setTimeout (() => {
      this.addedMessage = "";
    }, 2500);

    console.log(this.serviceUserData.userInfo)

  }

}
