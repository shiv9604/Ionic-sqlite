import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
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

  dbObj: SQLiteObject;
  readonly database_name: string = 'users.db';
  readonly table_name: string = 'usersdata';

  name_model: string = '';
  data: any = [];
  userInfo: any;
  isDbTableCreated:boolean=false;

  // // Handle Update Row Operation
  // updateActive: boolean;
  // to_update_item: any;

  constructor(public sqlite: SQLite) {
  }

  async ngOnInit() { 
    const init = await this.createDBAndTable()
    this.getRows()
  }

  getFormData() {
    this.userInfo = this.userForm.value;
    console.log('User Data:', this.userInfo);
    this.insertRow()
  }

  createDBAndTable() {
    return new Promise((res,rej)=>{
      this.sqlite
      .create({
        name: this.database_name,
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.dbObj = db;
        console.log(this.database_name, 'Database Created!');
        // console.log("DB Obj",this.dbObj)


        // creating table
        this.dbObj
        .executeSql(
          `
      CREATE TABLE IF NOT EXISTS ${this.table_name}  (
        Name varchar(255),
        Age int(3),
        Email varchar(300),
        Password varchar(400))
      `,
          []
        )
        .then(() => {
          console.log('Table Created!');
          res('')
        })
        .catch((e) => {
          console.log('error ' + JSON.stringify(e));
          rej('')
        });
      })
      .catch((e) => {
        alert('error ' + JSON.stringify(e));
      });
    })
  }

  insertRow() {

    // // Destructuring form values
    // let {user_name:name, user_age:age, user_email:email, user_password : pass} = this.userInfo;
    if(true){

    this.dbObj
      .executeSql(
    //     `
    //   INSERT INTO ${this.table_name} (Name,Age,Email,Password) VALUES (${this.userInfo.name},${this.userInfo.age},${this.userInfo.email},${this.userInfo.pass},)
    // `,
    `
    INSERT INTO ${this.table_name} (Name,Age,Email,Password) VALUES ("Shiv","15","abc@gmail.com","pass",)
  `,
        []  
      )
      .then(() => {
        console.log('Row Inserted!');
        this.getRows();
        this.userForm.reset()
      })
      .catch((e) => {
        console.log('error ' + JSON.stringify(e));
      });
    }
    else{
      console.log("Data not presen")
    }
  }

  getRows() {
    
    this.dbObj
      .executeSql(
        `
    SELECT * FROM ${this.table_name}
    `,
        []
      )
      .then((res) => {
        this.data = [];
         console.log("Data Got from database :",res)
        // this.data.push(res) 
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.data.push(res.rows.item(i));
          }
        }
      })
      .catch((e) => {
        console.log('error ' + JSON.stringify(e));
      });
  
  }

  deleteRow(item) {
    this.dbObj
      .executeSql(
        `
      DELETE FROM ${this.table_name} WHERE pid = ${item.pid}
    `,
        []
      )
      .then((res) => {
        console.log('Row Deleted!');
        this.getRows();
      })
      .catch((e) => {
        console.log('error ' + JSON.stringify(e));
      });
  }
}
