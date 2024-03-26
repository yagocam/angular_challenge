import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private api: ApiService, private router: Router){}
    onLogin = () => {
      this.api.loginUser(this.loginObj).subscribe((data: any) => {
        this.loginObj = data; 
        if(data.access){
          localStorage.setItem('loginToken', data.access)
          this.router.navigateByUrl('/dashboard')
        }
      });
    }
  
  loginObj: any = {
    "username": "",
    "password": "", 
  }
 
}
