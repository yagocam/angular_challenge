import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from './task.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})
export class AppComponent {
  
}
