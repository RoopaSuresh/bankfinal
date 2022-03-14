import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // acno = ""
  // pswd = ""
  // amount = ""


  // acno1 = ""
  // pswd1 = ""
  // amount1 = ""

//deleteaccount
acno:any

//welcome user
  user:any

  //for date
  lDate:any

  //deposit group model creation
  //1)form group creation
  depositForm = this.fb.group({
    //2)form array creation
    // acno: [''],
    //acno for validation
    acno: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],

    // pswd: [''],
    //pswd for validation
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],

    // amount: [''],
    //amount for validation
    amount: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],


  })


  //withdraw group model creation
  //1)form group creation
  withdrawForm = this.fb.group({
    //2)form array creation
    // acno: [''],
    //acno for validation
    acno: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],

    // pswd: [''],
    //pswd for validation
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],

    // amount: [''],
    //amount for validation
    amount: ['', [Validators.required, Validators.pattern('[0-9 ]*')]],


  })



  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) {
    //welcome user
    this.user=this.ds.currentUname

    //for date (it can be done by creating a object by creating a new class)
    this.lDate=new Date()
   }


  ngOnInit(): void {
    //after loging out it should not go back to dashboard page on clicking back button
    if(!localStorage.getItem("currentAcno")){
      alert("Please login")
      this.router.navigateByUrl("")
    }
  }



  // //deposit
  // deposit() {
  //   // alert("deposit clicked")

  //   var acno = this.acno
  //   var pswd = this.pswd
  //   var amount = this.amount

  //   const result = this.ds.deposit(acno, pswd, amount)

  //   if (result) {
  //     alert(amount + " successfully deposited and new balance is " + result)
  //   }
  // }

  //deposit reactive form
  deposit() {

    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

    if (this.depositForm.valid) {
      const result = this.ds.deposit(acno, pswd, amount)

      if (result) {
        alert(amount + " successfully deposited and new balance is " + result)
      }
    }
    else {
      alert("Invalid form")
    }

  }



  // //withdraw
  // withdraw() {
  //   // alert("withdraw clicked")
  //   var acno = this.acno1
  //   var pswd = this.pswd1
  //   var amount = this.amount1

  //   //calling withdraw function of dataservice
  //   const result = this.ds.withdraw(acno,pswd,amount)

  //   if (result) {
  //     alert(amount + " successfully debited and new balance is " + result)
  //   }
  // }

  //withdraw.reactive form
  withdraw() {
    var acno = this.withdrawForm.value.acno
    var pswd = this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount
    if (this.withdrawForm.valid) {
      //calling withdraw function of dataservice
      const result = this.ds.withdraw(acno, pswd, amount)

      if (result) {
        alert(amount + " successfully debited and new balance is " + result)
      }
    }
    else {

      alert("Invalid form")
    }
  }




//logout
logout(){
  localStorage.removeItem("currentAcno")
  localStorage.removeItem("currentUname")
this.router.navigateByUrl("")
}




//delete account
deleteAccount(){
  this.acno=JSON.parse(localStorage.getItem("currentAcno")|| '')
}


//cancel
cancel(){
  this.acno=""
}

delete(event:any){
  alert("Delete account "+event+" from parent")
  this.router.navigateByUrl("")
}




  }
