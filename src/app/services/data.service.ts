import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { startWith } from 'rxjs';


const options={
  headers:new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentAcno: any
  currentUname: any

  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }

  }


  constructor(private http: HttpClient) {
    //calling getData function 
    // this.getData()
  }


  //to store data in local storage
  storeData() {
    localStorage.setItem("databaseNew", JSON.stringify(this.database))
    if (this.currentAcno) {
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
    if (this.currentUname) {
      localStorage.setItem("currentUname", JSON.stringify(this.currentUname))
    }
  }

  //to det data from local storage
  getData() {
    if (localStorage.getItem("databaseNew")) {
      this.database = JSON.parse(localStorage.getItem("databaseNew") || '')
    }
    if (localStorage.getItem("currentAcno")) {
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno") || '')
    }
    if (localStorage.getItem("currentUname")) {
      this.currentUname = JSON.parse(localStorage.getItem("currentUname") || '')
    }
  }

  // //register
  // register(acno: any, pswd: any, uname: any) {
  //   let database = this.database

  //   if (acno in database) {
  //     return false
  //   }
  //   else {

  //     database[acno] = {
  //       acno,
  //       uname,
  //       password: pswd, //key:value
  //       balance: 0,
  //       transaction:[]
  //     }
  //     console.log(database)
  //     //calling storeData function
  //     this.storeData()
  //     return true
  //   }
  // }

  //register after integrating with backend
  register(acno: any, pswd: any, uname: any) {
    //json data
    const data = {
      //the variable names should be same as that given in thunderclient's register body or it should be same with what is inside the register bracket above
      acno, pswd, uname
    }

    //register API
    return this.http.post('http://localhost:3000/register', data)

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

  // login for welcome user
  // //login
  // login(acno: any, password: any) {
  //   let database = this.database

  //   if (acno in database) {
  //     if (password == database[acno]["password"]) {
  //       this.currentAcno=acno
  //       //storing uname into a variable
  //       this.currentUname=database[acno]["uname"]
  //             //calling storeData function
  //       this.storeData()
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


  //login after integrating with backend
  login(acno: any, password: any) {

    //request body
    const data = {
      acno, password
    }

    //login API
    return this.http.post('http://localhost:3000/login', data)


  }




  // //deposit
  // deposit(acno: any, password: any, amt: any) {
  //   var amount = parseInt(amt)
  //   let database = this.database

  //   if (acno in database) {
  //     if (password == database[acno]["password"]) {
  //       database[acno]["balance"] += amount
  //       database[acno]["transaction"].push({
  //         //key:value
  //         amount: amount,
  //         type: "CREDIT"
  //       })
  //       //calling storeData function
  //       this.storeData()
  //       return database[acno]["balance"]
  //     }
  //     else {
  //       alert("Incorrect password")
  //       return false
  //     }
  //   }
  //   else {
  //     alert("user does not exist")
  //     return false
  //   }
  // }

    //deposit after integrating with backend
    deposit(acno: any, password: any, amt: any) {

//specify request body 
const data={
  acno,password,amt
}



//deposit API CALL
return this.http.post('http://localhost:3000/deposit', data,this.getOptions())

      
      // var amount = parseInt(amt)
      // let database = this.database
  
      // if (acno in database) {
      //   if (password == database[acno]["password"]) {
      //     database[acno]["balance"] += amount
      //     database[acno]["transaction"].push({
      //       //key:value
      //       amount: amount,
      //       type: "CREDIT"
      //     })
      //     //calling storeData function
      //     this.storeData()
      //     return database[acno]["balance"]
      //   }
      //   else {
      //     alert("Incorrect password")
      //     return false
      //   }
      // }
      // else {
      //   alert("user does not exist")
      //   return false
      // }
    }

//to add token in request header

getOptions(){
  //token fetch
const token=JSON.parse(localStorage.getItem('token')||'')
//to create request header
let headers=new HttpHeaders()
if(token){
  headers=headers.append('x-access-token',token)
  options.headers=headers
}
return options
}







  


  //withdraw
  // withdraw(acno: any, password: any, amt: any) {
  //   var amount = parseInt(amt)
  //   let database = this.database

  //   if (acno in database) {
  //     if (password == database[acno]["password"]) {
  //       if (database[acno]["balance"] > amount) {
  //         database[acno]["balance"] -= amount
  //         database[acno]["transaction"].push({
  //           //key:value
  //           amount: amount,
  //           type: "DEBIT"
  //         })
  //         //calling storeData function
  //         this.storeData()
  //         return database[acno]["balance"]

  //       }
  //       else {
  //         alert("insufficient balance")
  //       }
  //     }
  //     else {
  //       alert("Incorrect password")
  //       return false
  //     }
  //   }
  //   else {
  //     alert("user does not exist")
  //     return false
  //   }
  // }

//withdraw after integrating with backend
  withdraw(acno: any, password: any, amt: any) {

//specify request body 
const data={
  acno,password,amt
}


//withdraw API CALL
return this.http.post('http://localhost:3000/withdraw', data,this.getOptions())




    // var amount = parseInt(amt)
    // let database = this.database

    // if (acno in database) {
    //   if (password == database[acno]["password"]) {
    //     if (database[acno]["balance"] > amount) {
    //       database[acno]["balance"] -= amount
    //       database[acno]["transaction"].push({
    //         //key:value
    //         amount: amount,
    //         type: "DEBIT"
    //       })
    //       //calling storeData function
    //       this.storeData()
    //       return database[acno]["balance"]

    //     }
    //     else {
    //       alert("insufficient balance")
    //     }
    //   }
    //   else {
    //     alert("Incorrect password")
    //     return false
    //   }
    // }
    // else {
    //   alert("user does not exist")
    //   return false
    // }
  }









  // //transaction
  // getTransaction(acno: any) {
  //   return this.database[acno]["transaction"]
  // }





  //transaction after integrating with backend
  getTransaction(acno: any) {

    //specify request body 
const data={
  acno
}

//transaction API CALL
return this.http.post('http://localhost:3000/transaction', data,this.getOptions())

    // return this.database[acno]["transaction"]
  }




//delete acc after integrating with backend
delete(acno:any){
  //no need for body here only API call is enough
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
}







}





