import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonGrid } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
 
  userForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    pass: new FormControl('',[Validators.required]),
  })

  constructor(
    public sqlLite:SQLite
  ) {}

  ngOnInit(){
    
  }

  getData(){
      console.log("User Data:",this.userForm.value)
  }

  createDataBase(){
    this.sqlLite.create({
      name:'user-data',
      location:'default'
    })
    .then((db: SQLiteObject) => {


      db.executeSql('create table danceMoves(name VARCHAR(32))', [])
        .then(() => console.log('Executed SQL'))
        .catch(e => console.log(e));
  
  
    })
    .catch(e => console.log(e));
  }

  


}
