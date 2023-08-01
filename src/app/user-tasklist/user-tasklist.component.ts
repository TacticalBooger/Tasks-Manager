import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-tasklist',
  templateUrl: './user-tasklist.component.html',
  styleUrls: ['./user-tasklist.component.css']
})
export class UserTasklistComponent implements OnInit {

  currentDate!: Date;
  personLoggedIn = this.serviceUserData.personLoggedIn[1]
  personLoggedInUpperCase = this.personLoggedIn.charAt(0).toUpperCase() + this.personLoggedIn.slice(1);

  //initialized variables

  additional_subject!: any
  additional_priority!: any
  additional_status!: any
  additional_start_date!: any
  additional_end_date!: any
  additional_assignedTo!: any
  additional_department!: any
  additional_additional_description!: any
  additional_completed_by!: any
  additional_comments!: any

  backendData!: any;
  editMessage = ""
  selection!: number
  editTaskActive: boolean = false
  additionalDetailsActive: boolean = false
  selection2!: number
  showSuccess2!: boolean
  editMessage2 = ""
  addCommentForm!: FormGroup

  constructor(private fb: FormBuilder, private serviceUserData: UserDataService, private datePipe: DatePipe) {

  }

  ngOnInit() {

    this.getTasks()

    this.addCommentForm = this.fb.group({
      comments: ['', Validators.required]
    })

    this.updateTaskStatus()
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

  backToList() { //Simple button to go back to main
    this.additionalDetailsActive = false
    this.getTasks();
  }

  additionalDetails(id: number) { //Runs when you click on any task for additional info
    this.additionalDetailsActive = true

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
      this.additional_completed_by = task.completed_by;
      this.additional_comments = task.comments;
      this.selection2 = task.id;

      this.getTasks();
    }
  }

  addComment() {
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

