import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  currentDate = new Date();

  userInfo: any = [
    {
      subject: "Mark Group 2 Exams",
      priority: "HIGH",
      start_date: this.currentDate,
      finish_date: "Test1",
      department: "Test1",
      assignedTo: "Test1",
      status: "Undefined"
    },
    {
      subject: "Beat up students",
      priority: "HIGH",
      start_date: this.currentDate,
      finish_date: "Test2",
      department: "Test2",
      assignedTo: "Test2",
      status: "Undefined"
    },
    {
      subject: "Replace the coffee machine - 2nd floor",
      priority: "MED",
      start_date: this.currentDate,
      finish_date: "Test3",
      department: "Test3",
      assignedTo: "Test3",
      status: "Undefined"
    },
    {
      subject: "Shaji nga ropt studentet!",
      priority: "LOW",
      start_date: this.currentDate,
      finish_date: "Test4",
      department: "Test4",
      assignedTo: "Test4",
      status: "Undefined"
    },
  ]

  serviceDeleteTask(i:number) {
    this.userInfo.splice(i, 1);
  }

  serviceCompleteTask(i:number) {
    this.userInfo[i].status = "Completed"
  }

}
