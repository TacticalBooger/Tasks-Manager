import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-addtask',
  templateUrl: './admin-addtask.component.html',
  styleUrls: ['./admin-addtask.component.css']
})
export class AdminAddtaskComponent implements OnInit {

  // currentDate = new Date();

  constructor(private fb: FormBuilder,
    private serviceUserData: UserDataService,
    private router: Router,
    private datePipe: DatePipe) {

  }

  ngOnInit() { //FormBuilder for adding tasks
    this.addTaskForm = this.fb.group({
      subject: ['', Validators.required],
      additional_description: [''],
      priority: ['', Validators.required],
      status: [''],
      start_date: ['', Validators.required],
      finish_date: ['', Validators.required],
      department: ['', Validators.required],
      assignedTo: [''],
      completed_by: ['']
    });
  }

  //initialized variables
  addTaskForm!: FormGroup;

  addedMessage!: string
  backendData!: any
  showSuccess!: boolean

  addTaskArray: any = {}

  getTasks() { //grab tasks from backend
    this.serviceUserData.getData().subscribe((data: any) => {

      this.backendData = data.userInfo;
    })
  }

  addTask() { //runs when you hit ADD TASK
    const addTask = this.addTaskForm.value

    addTask.start_date = this.datePipe.transform(addTask.start_date, 'MMM d, yyyy');
    addTask.finish_date = this.datePipe.transform(addTask.finish_date, 'MMM d, yyyy');

    if (addTask.additional_description === '') {
      addTask.additional_description = 'Not Available'
    }

    if (addTask.assignedTo === '') {
      addTask.assignedTo = 'Not Available'
    }

    if (addTask.completed_by === '') {
      addTask.completed_by = 'Not Available'
    }

    this.serviceUserData.servicePostTask(addTask).subscribe((data: any) => {
      this.getTasks();
    })

    this.showSuccess = true
    this.addedMessage = "Task Added!"
    setTimeout(() => {
      this.addedMessage = "";
      this.router.navigate(['/main'])
      this.showSuccess = false
    }, 1500);

  }

  admin_takeToMainTask() { //simple button to go back to main
    this.router.navigate(['/main'])
  }

}
