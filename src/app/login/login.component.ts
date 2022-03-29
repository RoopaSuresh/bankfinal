import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //string interpolation
  aim = "Your Perfect Banking Partner"
  //property binding
  accno = "Account Number Please"

  //event binding using event as argument
  acno = ""
  pswd = ""

  //login group model creation
  //1)form group creation
  loginForm = this.fb.group({
    //2)form array creation
    // acno: [''],
    //acno for validation
    acno: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],

    // pswd: [''],
    //pswd for validation
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],


  })





  // database:any={
  //   1000:{acno:1000,uname:"Neer",password:1000,balance:5000},
  //   1001:{acno:1000,uname:"Vyom",password:1001,balance:5000},
  //   1002:{acno:1000,uname:"Laisha",password:1002,balance:5000}

  // }
  constructor(private routerLogin: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // //event binding with event-acno change
  // acnoChange(event:any){
  //   this.acno=event.target.value
  //   console.log(this.acno);

  // }

  //   //event binding with event-pswd change
  //   pswdChange(event:any){
  //     this.pswd=event.target.value
  //     console.log(this.pswd);

  //   }


  // //event binding
  // login(){
  //   alert("login clicked!!!")
  // }


  //event binding using event
  // login(){
  //   var acno=this.acno
  //   var pswd=this.pswd

  //   let database=this.database
  //   if(acno in this.database){

  //     if (pswd==database[acno]["password"])
  //or if(pswd==database[acno].password) acno should be given in square brackets since it is considered as index no
  //{
  //       alert("login success")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("account does not exist")
  //   }
  // }


  // //login using template referencing variable
  //   login(a:any,p:any){
  //     var acno=a.value
  //     var pswd=p.value

  //     let database=this.database
  //     if(acno in this.database){

  //       if (pswd==database[acno]["password"]){
  //         alert("login success")
  //       }
  //       else{
  //         alert("incorrect password")
  //       }
  //     }
  //     else{
  //       alert("account does not exist")
  //     }
  //   }


  // //two way binding
  // login(){
  //   var acno=this.acno
  //   var pswd=this.pswd

  //   let database=this.database
  //   if(acno in this.database){

  //     if (pswd==database[acno]["password"]) 
  //     //or if(pswd==database[acno].password) acno should be given in square brackets since it is considered as index no
  //     {
  //       alert("login success")
  //       this.routerLogin.navigateByUrl("dashboard")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("account does not exist")
  //   }
  // }



  // //login after register service
  // login(){
  //   var acno=this.acno
  //   var pswd=this.pswd

  //   let database=this.ds.database
  //   if(acno in database){

  //     if (pswd==database[acno]["password"]) 
  //     //or if(pswd==database[acno].password) acno should be given in square brackets since it is considered as index no
  //     {
  //       alert("login success")
  //       this.routerLogin.navigateByUrl("dashboard")
  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("account does not exist")
  //   }
  // }



  //login after login service
  // login(){
  //   var acno=this.acno
  //   var pswd=this.pswd

  //   const result=this.ds.login(acno,pswd)

  //   if(result)
  //   {
  //     alert("login success")
  //     this.routerLogin.navigateByUrl("dashboard")
  //   }

  // }


  // //login reactive form
  // login() {
  //   var acno = this.loginForm.value.acno
  //   var pswd = this.loginForm.value.pswd
  //   if (this.loginForm.valid) {
  //     const result = this.ds.login(acno, pswd)

  //     if (result) {
  //       alert("login success")
  //       this.routerLogin.navigateByUrl("dashboard")
  //     }
  //   }
  //   else{
  //     alert("Invalid form")
  //   }


  // }




  //login after integrating with backend
  login() {
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd

    if (this.loginForm.valid) {
      //asynchronous call login
      this.ds.login(acno, pswd)

        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem('currentAcno', JSON.stringify(result.currentAcno))
            localStorage.setItem('currentUname', JSON.stringify(result.currentUname))
            localStorage.setItem('token', JSON.stringify(result.token))
            alert(result.message)
            this.routerLogin.navigateByUrl("dashboard")
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )

    }
    else {
      alert("Invalid form")
    }


  }


}
