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
    this.waitForDBAndTable();
  }

  ngOnInit() {
    
  }
  
  createDBAndTable() {
    this.platform.ready().then(()=>{
      return new Promise((res,rej)=>{
        this.sqlite
        .create({
          name: this.database_name,
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          console.log("Device is Compatible for Ionic Sqlite")

          this.dbObj = db;
          this.isDbTableCreated = true;
          console.log(this.database_name, 'Database Created!');
          // console.log("DB Obj",this.dbObj)
  
          // creating table
          this.dbObj
          .executeSql(
            `
        CREATE TABLE IF NOT EXISTS ${this.table_name}  (
          user_id INTEGER NOT NULL AUTO_INCREMENT, 
          User Name varchar(100) NOT NULL,
          Password varchar(100) NOT NULL)
          PRIMARY_KEY(user_id)
        `,
            []
          )
          .then(() => {
            console.log('Table Created!');
            res('')
          })
          .catch((e) => {
            console.log('Create Table error ' + JSON.stringify(e));
            rej('')
          });
        })
        .catch((e) => {
          console.log('Create Database error ' + JSON.stringify(e));
        });
      })
    })
    .catch((e)=>{
      console.log("Ionic Sqlite does not support to this device",JSON.stringify(e))
    })    
    
  }

  async waitForDBAndTable(){
    try{

      await this.createDBAndTable()
    }
    catch(e){

      console.log("Error Occured While creating DB & Table",JSON.stringify(e))
    }
  }

  getData(){
    if(this.isDbTableCreated){
      let result;
      let error;
       this.dbObj.executeSql(`SELECT * FROM ${this.table_name}`)
       .then((res)=>{
         result = res;
         console.log("Response got sucessfully...",res)
         return result;
       })
       .catch((e)=>{
        error = e;
        console.log("Error Occuerd while posting data",JSON.stringify(e))
        return error;
       })
    }
    else{
      console.log("Database Not Created, Cant get Users Data")
    }
    
     
  }

  postData(name,email,pass){
    if(this.isDbTableCreated){
      this.dbObj.executeSql(`INSERT INTO ${this.table_name}(Name,Email, Password) VALUES(${name},${email},${pass})`)
      .then((res)=>{
        console.log("Data Posted Sucessfully...",res)
        this.getData()
      })
      .catch((e)=>{
        console.log("Error Occuerd while posting data",JSON.stringify(e))
      })
    }
    else{
      console.log("Database Not Created, Cant Post Users Data")
    }
     
  }

  deleteData(id){

    if(this.isDbTableCreated){
      this.dbObj.executeSql(`DELETE FROM ${this.table_name} WHERE ID=${id}`)
      .then((res)=>{
        console.log("Deleted From Table",res)
        this.getData()
      })
      .catch((e)=>{
        console.log("Failed to delete row",JSON.stringify(e))
      })
    }
    else{
      console.log("Database Not Created, Cant delete Users Data")
    }
  }

  updateData(id,userObj){
    if(this.isDbTableCreated){
      this.dbObj.executeSql(`UPDATE ${this.table_name} SET Name=${userObj.name} Email=${userObj.email} Password=${userObj.pass} WHERE id=${id}`)
      .then((res)=>{
        console.log("User Updated Sucessfully...",res)
        this.getData()
      })
      .catch((e)=>{
        console.log("Failed to update user",JSON.stringify(e))
      })
    }
    else{
      console.log("Database Not Created, Cant Update Users Data")
    }
  
  }

}
