import { SqliteService } from './../services/sqlite.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  user:any = {}
  usersData:any;

  constructor(public sql:SqliteService) {
  }

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this.usersData = this.sql.getData()
    console.log("Users Data Got",this.usersData)
  }

   createUser(){
    let {name,pass} = this.userForm.value
    console.log("name:",name)
    console.log("pass:",pass)
    this.sql.postData(name,pass)
    // this.clearForm()
  }

  updateUser(id,userObj){
    this.sql.updateData(id,userObj) 
  }

  deleteUser(id){
    this.sql.deleteData(id)
  }
  clearForm(){
    this.userForm.reset()
    console.log("Form Cleared...")
  }

}
