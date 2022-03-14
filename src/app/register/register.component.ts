import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname = ""
  acno = ""
  pswd = ""


  //register group model creation
  //1)form group creation
  registerForm = this.fb.group({
    //2)form array creation
    // acno: [''],
        //acno for validation
    acno: ['',[Validators.required,Validators.pattern('[0-9 ]*')]],

    // pswd: [''],
        //pswd for validation
    pswd: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]],

    // uname: ['']
    //uname for validation
    uname: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]]

  })


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  // register() {
  //   // alert("register clicked")

  //   // //to hold user typing acno,username and password
  //   // var acno = this.acno
  //   // var pswd = this.pswd
  //   // var uname = this.uname


  //   const result = this.ds.register(acno, pswd, uname) //here the variables defined above are defined inside the brackets
  //   //const result is used to call the register function from dataservice //since register is a function openthe brackets
  //   if (result) {
  //     alert("successfully registered")
  //     //now it should navigate to login page. for this we need to give router inside constructor and then use navigatebyurl
  //     this.router.navigateByUrl("")

  //   }
  //   else {
  //     alert("user already exist..please log in")
  //   }

  // }


  //reactiveform
  register() {
    // alert("register clicked")

    // //to hold user typing acno,username and password
    // var acno = this.acno
    // var pswd = this.pswd
    // var uname = this.uname

    // console.log(this.registerForm);


    //register form
    //we need accountno,password and username from register form. for this we need to first console log register form to see where these value lies
    // console.log(this.registerForm);
    //it lies in value->acno,pswd,uname. 
    //hence
    // var acno = this.registerForm.value.acno
    // var pswd = this.registerForm.value.pswd
    // var uname = this.registerForm.value.uname


//to see if there is error in our uname
    console.log(this.registerForm.get('uname')?.errors);
    
    var acno = this.registerForm.value.acno
    var pswd = this.registerForm.value.pswd
    var uname = this.registerForm.value.uname



    //to check if the register for is valid or not
    if (this.registerForm.valid) {
      const result = this.ds.register(acno, pswd, uname) //here the variables defined above are defined inside the brackets
      //const result is used to call the register function from dataservice //since register is a function openthe brackets
      if (result) {
        alert("successfully registered")
        //now it should navigate to login page. for this we need to give router inside constructor and then use navigatebyurl
        this.router.navigateByUrl("")
  
      }
      else {
        alert("user already exist..please log in")
      }
    }
    else{
      alert("invalid form")
    }

   

  }



}
