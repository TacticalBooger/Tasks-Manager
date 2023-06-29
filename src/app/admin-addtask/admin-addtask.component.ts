import { Component } from '@angular/core';
import { timeout } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-addtask',
  templateUrl: './admin-addtask.component.html',
  styleUrls: ['./admin-addtask.component.css']
})
export class AdminAddtaskComponent {

  // currentDate = new Date();

  constructor(private serviceUserData: UserDataService, private router: Router) {

  }
  addedMessage!: string
  add_taskSubject!: string
  add_additional_description!: string
  add_taskPriority!: string
  add_taskDepartment!: string
  add_taskAssignedTo!: string
  backendData!: any

  addTaskArray: any = {}

  getTasks() {
    this.serviceUserData.getData().subscribe((data: any) => {

      this.backendData = data.userInfo;
    })
  }

  addTask() {
    this.addTaskArray =
    {
      subject: this.add_taskSubject,
      priority: this.add_taskPriority,
      additional_description: this.add_additional_description,
      status: "Undefined",
      start_date: "test",
      finish_date: "test",
      department: this.add_taskDepartment,
      assignedTo: this.add_taskAssignedTo,
    }

    this.serviceUserData.servicePostTask(this.addTaskArray).subscribe((data: any) => {
      this.getTasks();
    })

    this.addedMessage = "Task Added!"
    setTimeout(() => {
      this.addedMessage = "";
    }, 2500);

  }

  admin_takeToMainTask() {
    this.router.navigate(['/main'])
  }

}
