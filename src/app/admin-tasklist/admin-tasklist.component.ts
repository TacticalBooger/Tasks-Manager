import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-tasklist',
  templateUrl: './admin-tasklist.component.html',
  styleUrls: ['./admin-tasklist.component.css']
})
export class AdminTasklistComponent implements OnInit {

  currentDate!: Date;

  //initialized variables
  editTaskForm!: FormGroup;
  personLoggedIn = this.serviceUserData.personLoggedIn[1]

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
  additional_completed_by!: any

  backendData!: any;
  editMessage = ""
  selection!: number
  editTaskActive: boolean = false
  additionalDetailsActive: boolean = false

  constructor(private fb: FormBuilder, private serviceUserData: UserDataService, private datePipe: DatePipe) {

  }

  ngOnInit() {

    this.getTasks() //Form Builder for editing tasks

    this.editTaskForm = this.fb.group({
      id: [''],
      subject: ['', Validators.required],
      additional_description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      start_date: ['', Validators.required],
      finish_date: ['', Validators.required],
      department: ['', Validators.required],
      assignedTo: [''],
      completed_by: ['']
    });

    this.updateTaskStatus()
  }

  updateTaskStatus() {
    const currentDate = new Date();
    this.backendData.forEach((task: any) => {
      const startDate = new Date(task.start_date);
      const endDate = new Date(task.finish_date);

      if (task.status !== 'Completed' && currentDate < startDate) {
        task.status = 'Pending';
      } else if (task.status !== 'Completed' && currentDate >= startDate && currentDate <= endDate) {
        task.status = 'In Progress';
      } else if (task.status !== 'Completed' && currentDate > endDate) {
        task.status = 'Overdue';
      }
    });
  }

  getTasks() { //grab tasks from backend
    this.serviceUserData.getData().subscribe((data: any) => {

      this.backendData = data.userInfo;
      this.updateTaskStatus()
    })
  }

  completeTask(id: number) { //complete task when you press COMPLETE
    const val = confirm("Are you sure you want to complete this task?");
    if (val) {
      const completeItem = {
        status: "Completed",
        completed_by: this.personLoggedIn
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

  deleteTask(id: number) { // delete task when you press DELETE
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

  editTask(id: number) { // runs when you hit EDIT on a task
    this.editTaskActive = true;
    this.additionalDetailsActive = false;
    let task = this.backendData.find((task: any) => task.id === id);

    if (task) {
      this.editTaskForm.setValue(task);
      this.selection = task.id;
    }
  }

  editTaskFinal() { //runs when you hit UPDATE TASK after clicking EDIT
    let updatedTask = this.backendData.find((task: any) => task.id === this.selection);

    if (updatedTask) {
      updatedTask = this.editTaskForm.value;

      updatedTask.start_date = this.datePipe.transform(updatedTask.start_date, 'MMM d, yyyy');
      updatedTask.finish_date = this.datePipe.transform(updatedTask.finish_date, 'MMM d, yyyy');

      if (updatedTask.additional_description === '') {
        updatedTask.additional_description = 'N/A'
      }

      if (updatedTask.assignedTo === '') {
        updatedTask.assignedTo = 'N/A'
      }

      if (updatedTask.status !== 'Completed')
        updatedTask.completed_by = 'N/A'

      if (updatedTask.completed_by === '') {
        updatedTask.completed_by = 'N/A'
      }

      this.serviceUserData.servicePatchTask(this.selection, updatedTask).subscribe((data: any) => {
        this.getTasks();
      });

      this.editMessage = "Task Updated!";
      setTimeout(() => {
        this.editMessage = "";
      }, 2500);
    }
  }

  backToList() { //Simple button to go back to main
    this.editTaskActive = false
    this.additionalDetailsActive = false
    this.getTasks();
  }

  additionalDetails(id: number) { //Runs when you click on any task for additional info
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
      this.additional_completed_by = task.completed_by
    }
  }

  taskColor(userdata: any): string { //colors the entire task row
    if (userdata.status === 'Completed') {
      return '#CBFFA9'; // Green
    } else if (userdata.status === 'Overdue') {
      return '#FF9B9B'; // Red
    } else if (userdata.status === 'In Progress' || userdata.status === 'Pending') {
      return '#EEEEEE';
    } else {
      return '';
    }
  }


  priorityColor(userdata: any): string { //colors the PRIORITY section only
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
