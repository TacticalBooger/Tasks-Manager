import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-tasklist',
  templateUrl: './admin-tasklist.component.html',
  styleUrls: ['./admin-tasklist.component.css']
})
export class AdminTasklistComponent implements OnInit {

  constructor(private fb: FormBuilder, private serviceUserData: UserDataService) {

  }

  ngOnInit() {

    this.getTasks()

    this.editTaskForm = this.fb.group({
      id: [''],
      subject: ['', Validators.required],
      additional_description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      start_date: [''],
      finish_date: [''],
      department: ['', Validators.required],
      assignedTo: ['', Validators.required]
    });
  }

  editTaskForm!: FormGroup;

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
      this.editTaskForm.setValue(task);
      this.selection = task.id;
    }
  }

  editTaskFinal() {
    let updatedTask = this.backendData.find((task: any) => task.id === this.selection);

    if (updatedTask) {
      updatedTask = this.editTaskForm.value;

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
    if (userdata.status === 'Completed') {
      return '#CBFFA9'; // Green
    } else if (userdata.status === 'Overdue') {
      return '#FF9B9B'; // Red
    } else if (userdata.status === 'Ongoing' || userdata.status === 'Pending') {
      return '#EEEEEE';
    } else {
      return '';
    }
  }


  priorityColor(userdata: any): string {
    if (userdata.priority === 'HIGH' && userdata.status === 'Completed') {
      return '#CBFFA9';
    } else if (userdata.priority === 'MED' && userdata.status === 'Completed') {
      return '#CBFFA9';
    } else if (userdata.priority === 'LOW' && userdata.status === 'Completed') {
      return '#CBFFA9';
    }

    else if (userdata.priority === 'HIGH' && userdata.status === 'Overdue') {
      return '#FF9B9B';
    }
    else if (userdata.priority === 'MED' && userdata.status === 'Overdue') {
      return '#FF9B9B';
    } else if (userdata.priority === 'LOW' && userdata.status === 'Overdue') {
      return '#FF9B9B';
    }


    else if (userdata.priority === 'HIGH' && (userdata.status !== 'Overdue' || userdata.status !== 'Completed')) {
      return '#5A96E3';
    }
    else if (userdata.priority === 'MED' && (userdata.status !== 'Overdue' || userdata.status !== 'Completed')) {
      return '#A1C2F1';
    } else if (userdata.priority === 'LOW' && (userdata.status !== 'Overdue' || userdata.status !== 'Completed')) {
      return '#C5DFF8';

    } else {
      return '';
    }
  }

}
