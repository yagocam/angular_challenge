import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent {
  tasks = [{title: 'test'}]

  constructor(private api: ApiService) {
    this.getTasks();
  }
  getTasks = () => {
    this.api.getAllTasks().subscribe((response: any[]) => {
      this.tasks = response; 
    },)
  }
}
