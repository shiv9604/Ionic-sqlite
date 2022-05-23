import { SqliteService } from './../services/sqlite.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  user:any = {}
  usersData:any;
  constructor(public sql:SqliteService) {
  }

  ngOnInit(){
    // this.getUsers()
  }

  async getUsers(){
    this.usersData = await this.sql.getData()
  }

  createUser(){
    let {name,email,pass} = this.userForm.value
    this.sql.postData(name,email,pass)
  }

  updateUser(id,userObj){
    this.sql.updateData(id,userObj) 
  }

  deleteUser(id){
    this.sql.deleteData(id)
  }

}
