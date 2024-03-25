import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any>{
    return this.http.get(this.baseurl + '/tasks/', {headers: this.httpHeaders})
  }
  getTask(id: string): Observable<any>{
    return this.http.get(this.baseurl + '/tasks/' + id + '/',
    {headers: this.httpHeaders})
  }
  updateTask(task: Task): Observable<any>{
    const body = {title: task.title, description: task.description, complete: task.complete};
    return this.http.put(this.baseurl + '/tasks/' + task.id_task + '/', body,
    {headers: this.httpHeaders})
  }
}
