import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { UserDataService } from '../user-data.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-addtask',
  templateUrl: './admin-addtask.component.html',
  styleUrls: ['./admin-addtask.component.css']
})
export class AdminAddtaskComponent implements OnInit {

  // currentDate = new Date();

  constructor(private fb: FormBuilder, private serviceUserData: UserDataService, private router: Router) {

  }

  ngOnInit() {
    this.addTaskForm = this.fb.group({
      subject: ['', Validators.required],
      additional_description: [''],
      priority: ['', Validators.required],
      status: ['Pending', Validators.required],
      start_date: ['test'],
      finish_date: ['test'],
      department: ['', Validators.required],
      assignedTo: ['']
    });
  }

  addTaskForm!: FormGroup;

  addedMessage!: string
  backendData!: any

  addTaskArray: any = {}

  getTasks() {
    this.serviceUserData.getData().subscribe((data: any) => {

      this.backendData = data.userInfo;
    })
  }

  addTask() {
    const addTask = this.addTaskForm.value
    
    this.serviceUserData.servicePostTask(addTask).subscribe((data: any) => {
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
