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

    this.getTasks()

  }

  edit_subject!: any
  edit_priority!: any
  edit_status!: any
  edit_start_date!: any
  edit_end_date!: any
  edit_assignedTo!: any
  edit_department!: any
  edit_additional_description!: any

  additional_subject!: any
  additional_priority!: any
  additional_status!: any
  additional_start_date!: any
  additional_end_date!: any
  additional_assignedTo!: any
  additional_department!: any
  additional_additional_description!: any

  backendData!: any;
  editMessage = ""
  selection!: number
  editTaskActive: boolean = false
  additionalDetailsActive: boolean = false

  getTasks() {
    this.serviceUserData.getData().subscribe((data: any) => {

      this.backendData = data.userInfo;
    })
  }

  completeTask(id: number) {
    const val = confirm("Are you sure you want to complete this task?");
    if (val) {
      const completeItem = {
        status: "Completed"
      };
      const task = this.backendData.find((task: any) => task.id === id);
      if (task) {
        this.serviceUserData.servicePatchTask(id, completeItem).subscribe((data: any) => {
          task.status = completeItem.status;
          this.getTasks();
        });
      }
    }
  }

  deleteTask(id: number) {
    const val = confirm("Are you sure you want to delete this task?");
    if (val) {
      const taskIndex = this.backendData.findIndex((task: any) => task.id === id);
      if (taskIndex !== -1) {
        this.serviceUserData.serviceDeleteTask(id).subscribe((data: any) => {
          this.backendData.splice(taskIndex, 1);
        });
      }
    }
    this.getTasks();
  }

  editTask(id: number) {
    this.editTaskActive = true;
    this.additionalDetailsActive = false;
    let task = this.backendData.find((task: any) => task.id === id);
    if (task) {
      this.edit_subject = task.subject;
      this.edit_status = task.status;
      this.edit_additional_description = task.additional_description;
      this.edit_priority = task.priority;
      this.edit_start_date = task.start_date;
      this.edit_end_date = task.finish_date;
      this.edit_assignedTo = task.assignedTo;
      this.edit_department = task.department;
      this.selection = task.id;
    }
  }

  editTaskFinal() {
    const updatedTask = this.backendData.find((task: any) => task.id === this.selection);

    if (updatedTask) {
      updatedTask.subject = this.edit_subject;
      updatedTask.priority = this.edit_priority;
      updatedTask.additional_description = this.edit_additional_description;
      updatedTask.status = this.edit_status;
      updatedTask.assignedTo = this.edit_assignedTo;
      updatedTask.department = this.edit_department;

      this.serviceUserData.servicePatchTask(this.selection, updatedTask).subscribe((data: any) => {
        this.getTasks();
      });

      this.editMessage = "Task Updated!";
      setTimeout(() => {
        this.editMessage = "";
      }, 2500);
    }
  }

  backToList() {
    this.editTaskActive = false
    this.additionalDetailsActive = false
    this.getTasks();
  }

  additionalDetails(id: number) {
    this.additionalDetailsActive = true
    this.editTaskActive = false

      let task = this.backendData.find((task: any) => task.id === id);
      if (task) {
      this.additional_subject = task.subject;
      this.additional_status = task.status;
      this.additional_additional_description = task.additional_description;
      this.additional_priority = task.priority;
      this.additional_start_date = task.start_date;
      this.additional_end_date = task.finish_date;
      this.additional_assignedTo = task.assignedTo;
      this.additional_department = task.department;
      }
    }

  taskColor(userdata: any): string {
    return userdata.status === 'Completed' ? '#38E54D' : //Green
      userdata.status === 'Ongoing' ? '#FFD93D' : //Yellow
        userdata.status === 'Pending' ? '#9BA4B5' : //Steel Blue
          userdata.status === 'Overdue' ? '#FF0032' : '' // Red
  }

  priorityColor(userdata: any): string {
    return userdata.priority === 'HIGH' ? 'red' :
      userdata.priority === 'MED' ? 'yellow' :
        userdata.priority === 'LOW' ? 'grey' : ''
  }

}
