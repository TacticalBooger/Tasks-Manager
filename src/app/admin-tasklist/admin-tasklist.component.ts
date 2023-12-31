import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-tasklist',
  templateUrl: './admin-tasklist.component.html',
  styleUrls: ['./admin-tasklist.component.css']
})
export class AdminTasklistComponent implements OnInit {

  //initialized variables
  editTaskForm!: FormGroup;
  personLoggedIn = this.serviceUserData.personLoggedIn[1]

  backendData!: any
  showTaskDetails!: any
  currentDate!: Date
  editMessage: string = ""
  editMessage2: string = ""
  selection!: number
  selection2!: number
  editTaskActive: boolean = false
  additionalDetailsActive: boolean = false
  showSuccess!: boolean
  showSuccess2!: boolean
  addCommentForm!: FormGroup

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
      comments: [''],
      completed_by: ['']
    });

    this.addCommentForm = this.fb.group({
      comments: ['', Validators.required]
    })
  }

  updateTaskStatus() { //automatically runs on app and sets the status according to date
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

      this.backendData = data.userInfo
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
          setTimeout(() => {
            this.getTasks();
          }, 500);
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
    setTimeout(() => {
      this.getTasks();
    }, 500);
  }

  editTask(id: number) { // runs when you hit EDIT on a task
    this.editTaskActive = true;
    this.additionalDetailsActive = false;
    let task = this.backendData.find((task: any) => task.id === id);

    if (task) {

      task.start_date = new Date(task.start_date);
      task.finish_date = new Date(task.finish_date);

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
        updatedTask.additional_description = 'Not Available'
      }

      if (updatedTask.assignedTo === '') {
        updatedTask.assignedTo = 'Not Available'
      }

      if (updatedTask.status !== 'Completed')
        updatedTask.completed_by = 'Not Available'

      if (updatedTask.completed_by === '') {
        updatedTask.completed_by = 'Not Available'
      }

      this.serviceUserData.servicePatchTask(this.selection, updatedTask).subscribe((data: any) => {
        this.getTasks();
      });

      this.showSuccess = true
      this.editMessage = "Task Updated!";
      setTimeout(() => {
        this.editMessage = "";
        this.editTaskActive = false
        this.additionalDetailsActive = false
        this.showSuccess = false
        this.getTasks();
      }, 1500);
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
      this.selection2 = task.id;

      this.showTaskDetails = task;

      this.getTasks();
    }
  }

  addComment() { //runs when you submit a comment to backend
    const selectedTask = this.backendData.find((task: any) => task.id === this.selection2);

    if (selectedTask) {
      const newComment = this.addCommentForm.value.comments;
      const person3 = this.personLoggedIn[0].toUpperCase() + this.personLoggedIn.slice(1);

      selectedTask.comments.push(person3 + ": " + newComment);

      this.serviceUserData.servicePatchTask(this.selection2, selectedTask).subscribe((data: any) => {
        this.getTasks();
      });

      this.addCommentForm.reset();

      this.showSuccess2 = true
      this.editMessage2 = "Comment Posted!";
      setTimeout(() => {
        this.editMessage2 = "";
        this.editTaskActive = false
        this.additionalDetailsActive = false
        this.showSuccess2 = false
        this.getTasks();
      }, 1500);
    }
  }

  taskColor(userdata: any): string { //colors the entire task row
    if (userdata.status === 'Completed') {
      return '#CBFFA9'; // Green
    } else if (userdata.status === 'Overdue') {
      return '#FEA1A1'; // Red
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
      return '#FEA1A1';
    }
    else if (userdata.priority === 'MED' && userdata.status === 'Overdue') {
      return '#FEA1A1';
    } else if (userdata.priority === 'LOW' && userdata.status === 'Overdue') {
      return '#FEA1A1';
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
