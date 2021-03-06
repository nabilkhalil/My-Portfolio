import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const localStorage = window.localStorage;


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }

  email:any
  password:any
  credentialsObj:any
  statusState:any
  status: any;

  ngOnInit() {
  }

  onSubmit(){
    this.credentialsObj = {"email":this.email, "password":this.password}
    console.log(this.credentialsObj)
    this.auth.login(this.credentialsObj).subscribe((data) => {
      this.status = data.json().data

      if (this.status === "Successfully Logged In"){
        this.router.navigateByUrl('admin');
        console.log("Successfully Logged In");
        console.log(data.json().token);
        localStorage.setItem('authorization', data.json().token);
      }else{
        if (this.status === "invalid Email"){
          console.log("Invalid Email");
          this.statusState = "Invalid Email";
        }else{
          console.log("Invalid Password");
          this.statusState = "Invalid Password";
        }
      }

    },(err)=>{
      console.log(err)
    })
  }
}
