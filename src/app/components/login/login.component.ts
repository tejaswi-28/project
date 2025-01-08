import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: any = {
    "email": '',
    "password": ''
  }

  isRegisterMode = false;
  
  switchToRegister(): void {
    this.isRegisterMode = true;
  }

  switchToLogin(): void {
    this.isRegisterMode = !this.isRegisterMode;
  }

  registerData: any = { "name": '', "email": '', "password":''};

  loaderForOauth2: boolean = false;

  http = inject(HttpClient)
  router = inject(Router)

  onLogin() {
    this.http.post("http://localhost:8080/api/auth/login", this.loginData).subscribe(
    // this.http.post("https://api.techeazyconsulting.com/api/auth/login", this.loginData).subscribe(
      (res: any) => {
        // Successful response handling
        alert(res.message);
        localStorage.setItem('myToken', res.data.jwtToken);
        localStorage.setItem('username', res.data.name);
        this.router.navigateByUrl('dashboard');
      },
      (error: any) => {
        // Error response handling
        if (error.error && error.error.message) {
          alert(error.error.message); // Show error message from the API
        } else {
          alert('An unexpected error occurred. Please try again later.');
        }
      }
    );
  }  

  onRegister(){
    this.http.post("http://localhost:8080/api/auth/register",this.registerData).subscribe((res:any) => {
    // this.http.post("https://api.techeazyconsulting.com/api/auth/register",this.registerData).subscribe((res:any) => {
      if(res){
        alert(res.message);
        this.router.navigateByUrl('login');
        this.reset();
      }else{
        alert(res.message);
      }
    })
  }

  handleOauth(){
    this.loaderForOauth2 = !this.loaderForOauth2;
    const BASE_URL = "http://localhost:8080";
    // const BASE_URL = "https://api.techeazyconsulting.com/";
    window.location.href = `${BASE_URL}/oauth2/authorization/google?frontend=project`;
  }

  reset(){
    this.registerData = { name:'', email: '', password:''};
  }
}
