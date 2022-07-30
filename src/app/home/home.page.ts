import { SqliteService } from './../services/sqlite.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// export class HomePage implements OnInit {
//   userForm = new FormGroup({
//     name: new FormControl('', [Validators.required]),
//     pass: new FormControl('', [Validators.required]),
//   });

//   user:any = {}
//   usersData:any;
//   dummyData:any = [
//     {
//       id:1,
//       name:"Shiv",
//       pass:"test@123"
//     },
//     {
//       id:2,
//       name:"Rahul",
//       pass:"app@123"
//     },
//     {
//       id:3,
//       name:"Pratik",
//       pass:"p@123"
//     },
//     {
//       id:4,
//       name:"mahesh",
//       pass:"pass"
//     },
//     {
//       id:5,
//       name:"rohan",
//       pass:"rk@123"
//     },
//   ];

//   constructor(public sql:SqliteService) {
//   }

//   ngOnInit(){
//     this.getUsers()
//   }

//   async getUsers(){
//     this.usersData = await this.sql.getData()
//     console.log("Users Data Got",this.usersData)
//   }

//    async createUser(){
//     let {name,pass} = this.userForm.value
//     console.log("name:",name);
//     console.log("pass:",pass);

//     let data = await this.sql.postData(name,pass)
//     console.log("Empty Arrayss",data)
//     this.getUsers()
//   }

//   updateUser(id,userObj){
//     this.sql.updateData(id,userObj) 
//   }

//   deleteUser(id){
//     this.sql.deleteData(id)
//   }
//   clearForm(){
//     this.userForm.reset()
//     console.log("Form Cleared...")
//   }

//   assinDummyData(){
//     setTimeout(()=>{
//       this.usersData = this.dummyData
//       console.log("Dummy Data Assigned...")
//     },3000) 
//   }

// }
















export class HomePage implements OnInit {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  user:any = {}
  usersData:any;
  dummyData:any = [
    {
      id:1,
      name:"Shiv",
      pass:"test@123"
    },
    {
      id:2,
      name:"Rahul",
      pass:"app@123"
    },
    {
      id:3,
      name:"Pratik",
      pass:"p@123"
    },
    {
      id:4,
      name:"mahesh",
      pass:"pass"
    },
    {
      id:5,
      name:"rohan",
      pass:"rk@123"
    },
  ];

  constructor(public sql:SqliteService) {
  }

  ngOnInit(){
    this.getUsers()
  }

  async getUsers(){
    this.usersData = await this.sql.getData()
    console.log("Users Data Got",this.usersData)
  }

   async createUser(){
    let {name,pass} = this.dummyData[0]
    console.log("Creating User...")
    console.log("name:",name);
    console.log("pass:",pass);

    let data = await this.sql.postData(name,pass)
    console.log("Empty Arrayss",data)
    this.getUsers()
  }

  updateUser(id?,userObj?){
    let userobj = this.dummyData[1]
    userobj['id'] = 2
    let {userId} = userobj

    console.log("Updating Obj",userobj)
    this.sql.updateData(userId,userobj) 
  }

  deleteUser(id?){
    let {id:userId} = this.dummyData[0]
    console.log("Deleting User of Id : ",userId)
    this.sql.deleteData(userId)
  }
  clearForm(){
    this.userForm.reset()
    console.log("Form Cleared...")
  }

  assinDummyData(){
    setTimeout(()=>{
      this.usersData = this.dummyData
      console.log("Dummy Data Assigned...")
    },3000) 
  }

}