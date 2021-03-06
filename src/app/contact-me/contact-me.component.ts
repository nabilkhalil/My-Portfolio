import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { AuthService } from '../_services/auth.service';
import { NgModel } from '@angular/forms';
const localStorage = window.localStorage;

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {
  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth()+1; //January is 0!
  yyyy = this.today.getFullYear();

  date = this.mm +'/'+ this.dd + '/' + this.yyyy


  messages: any;

  userMsg: any;
  userName: any;
  userEmail:any;
  userPhoneNum:any;
  newMsg: any;
  tokens: any;
  token:any
  tokenObj:any = {"newToken":localStorage.getItem('authorization')};
  messageSent:boolean;
  userSubmitted:boolean;

  constructor(private dataService: DataService, private authService: AuthService) {
    this.dataService.getMessages()
      .subscribe((data) => {
        this.messages = data
        console.log("got messages")
      });
      console.log(this.tokenObj)
      this.authService.checkToken(this.tokenObj).subscribe()
    
  }

  onSubmit(){
      this.userSubmitted = true
      this.newMsg = { 
        name: this.userName,
        email:this.userEmail, 
        phoneNumber: this.userPhoneNum, 
        date: this.date, 
        message: this.userMsg 
      }
      console.log(this.newMsg)
      if(this.newMsg.name === undefined || this.newMsg.email === undefined || this.newMsg.phoneNumber === undefined || this.newMsg.message === undefined){
        this.messageSent = false
      }else{
        //this.dataService.sendMessages(this.newMsg).subscribe()
        this.messageSent = true
      }

    }



  ngOnInit() {
  }

}
