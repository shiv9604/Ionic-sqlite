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
    name: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  user:any = {}
  constructor(public sql:SqliteService) {
    console.log("App Init")
  }

  ngOnInit(){

  }

  getFormData(){
    this.user = this.userForm.value
    console.log("User : ",this.user)
  }







}
