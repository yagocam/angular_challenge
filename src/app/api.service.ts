import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { Login } from './login/login.model'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://djangoapichallenge-production.up.railway.app";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}
  
  

  loginUser(loginObj: Login): Observable<any>{
    const body = {username: loginObj.username, password:loginObj.password}
    return this.http.post(this.baseurl + '/api/token/', body,{headers: this.httpHeaders})
  }

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
  createTask(task: Task): Observable<any>{
    const body = {title: task.title, description: task.description, complete: task.complete, user:task.user};
    return this.http.post(this.baseurl + '/tasks/', body,
    {headers: this.httpHeaders})
  }
  deleteTask(id: string): Observable<any>{
    return this.http.delete(this.baseurl + '/tasks/' + id + '/',
    {headers: this.httpHeaders})
  }
}
