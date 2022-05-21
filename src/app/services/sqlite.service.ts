import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})


export class SqliteService {

  dbObj: SQLiteObject;
  readonly database_name: string = 'users.db';
  readonly table_name: string = 'usersdata';

  name_model: string = '';
  data: any = [];
  userInfo: any;
  isDbTableCreated:boolean=false;
  
  constructor(
    public sqlite: SQLite,
    public platform:Platform
    ) 
  {
    this.waitForDBAndTable()

  }

  ngOnInit() {
    
    
  }
  
  createDBAndTable() {
    this.platform.ready().then(()=>{
      console.log("Device Ready")
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
          user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          Name varchar(255) NOT NULL,
          Age int(3) NOT NULL,
          Email varchar(300) NOT NULL,
          Password varchar(400) NOT NULL)
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
    })
    .catch((e)=>{
      console.log("Platform error",e)
    })    
    
  }

  async waitForDBAndTable(){
    try{

      await this.createDBAndTable()
    }
    catch(e){

      console.log("Error Occured While creating DB & Table",e)
    }
  }

  getData(){
     this.dbObj.executeSql(`SELECT * FROM ${this.table_name}`)
     
  }

  postData(id,name,email,pass){
    return this.dbObj.executeSql(`INSERT INTO ${this.table_name}(${id},${name},${email},${pass})`)
  }

}
