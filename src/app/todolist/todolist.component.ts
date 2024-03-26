import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Task } from '../task.model';
import { ExcelService } from '../services/excel.service';



@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  tasks = [{title: 'test', description: 'testando', complete: false, user: 'djasidasjdiasjij'}]
  selectedTask: Task = {};
  

  
  constructor(private api: ApiService, private excelService: ExcelService) {
    this.getTasks();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.excelService.processFile(file).then((data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.selectedTask.title = data[i][0]
          this.selectedTask.description = data[i][1]
          this.createTask();
        }
      }).catch((error) => {
        console.error("Erro ao processar o arquivo:", error);
      });
    }
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
