import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task.model';



@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  tasks = [{title: 'test', description: 'testando', complete: false, user: 'djasidasjdiasjij'}]
  selectedTask: Task = {};

  constructor(private api: ApiService) {
    this.getTasks();
  }
  getTasks = () => {
    this.api.getAllTasks().subscribe((data: any) => {
      this.tasks = data; 
    });
  }

  taskClicked = (task: Task) => {
    if (task.id_task) { 
      this.api.getTask(task.id_task).subscribe((data: any) => {
        this.selectedTask = data;
      });
    }
  }
  updateTask = (task: Task, isChecked: boolean) => {
    if(isChecked){
      task.complete = !task.complete
    }
      this.selectedTask = task
      this.api.updateTask(this.selectedTask).subscribe((data: any) => {
        this.selectedTask = data;
        this.getTasks()
      });
  }
  createTask = () => {
    this.api.createTask(this.selectedTask).subscribe((data: any) => {
      this.tasks.push(data) 
      this.getTasks()
    });
}
deleteTask = (task: Task) => {
  this.selectedTask = task;
  if(this.selectedTask.id_task){
  this.api.deleteTask(this.selectedTask.id_task).subscribe((data: any) => {
    this.getTasks()
    this.selectedTask = {}
  });
  }
}
}
