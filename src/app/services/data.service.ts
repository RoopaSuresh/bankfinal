import { Injectable } from '@angular/core';
import { startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

currentAcno:any
currentUname:any

  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000,transaction:[] },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000,transaction:[] }

  }


  constructor() { 
    //calling getData function
    this.getData()
  }


  //to store data in local storage
  storeData(){
    localStorage.setItem("databaseNew",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.currentUname){
      localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
    }
  }

  //to det data from local storage
  getData(){
    if(localStorage.getItem("databaseNew")){
      this.database=JSON.parse(localStorage.getItem("databaseNew")|| '')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")|| '')
    }
    if(localStorage.getItem("currentUname")){
      this.currentUname=JSON.parse(localStorage.getItem("currentUname")|| '')
    }
  }

  //register
  register(acno: any, pswd: any, uname: any) {
    let database = this.database

    if (acno in database) {
      return false
    }
    else {

      database[acno] = {
        acno,
        uname,
        password: pswd, //key:value
        balance: 0,
        transaction:[]
      }
      console.log(database)
      //calling storeData function
      this.storeData()
      return true
    }
  }


  //login
  // login(acno: any, password: any) {
  //   let database = this.database

  //   if (acno in database) {
  //     if (password == database[acno]["password"]) {
  //       this.currentAcno=acno
  //       return true
  //     }
  //     else {
  //       alert("incorrect password")
  //       return false
  //     }
  //   }
  //   else {
  //     alert("user does not exist")
  //     return false
  //   }
  // }

  //login for welcome user
    //login
    login(acno: any, password: any) {
      let database = this.database
  
      if (acno in database) {
        if (password == database[acno]["password"]) {
          this.currentAcno=acno
          //storing uname into a variable
          this.currentUname=database[acno]["uname"]
                //calling storeData function
          this.storeData()
          return true
        }
        else {
          alert("incorrect password")
          return false
        }
      }
      else {
        alert("user does not exist")
        return false
      }
    }
  
  


  //deposit
  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database

    if (acno in database) {
      if (password == database[acno]["password"]) {
        database[acno]["balance"] += amount
        database[acno]["transaction"].push({
          //key:value
          amount:amount,
          type:"CREDIT"
        })
              //calling storeData function
        this.storeData()
        return database[acno]["balance"]
      }
      else {
        alert("Incorrect password")
        return false
      }
    }
    else {
      alert("user does not exist")
      return false
    }
  }


  //withdraw
  withdraw(acno: any, password: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database

    if (acno in database) {
      if (password == database[acno]["password"]) {
if(database[acno]["balance"]>amount){
  database[acno]["balance"] -= amount
  database[acno]["transaction"].push({
    //key:value
    amount:amount,
    type:"DEBIT"
  })
        //calling storeData function
this.storeData()
  return database[acno]["balance"]

}
else{
  alert("insufficient balance")
}
      }
      else {
        alert("Incorrect password")
        return false
      }
    }
    else {
      alert("user does not exist")
      return false
    }
  }



  //transaction
  getTransaction(acno:any){
    return this.database[acno]["transaction"]
  }


}





