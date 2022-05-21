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
    ) { 
    console.log("App Init")
  }

  async ngOnInit() {
    try{
      const init = await this.createDBAndTable()
    // this.getRows()
    } 
    catch(e){
      console.log("Error occured in ngOninit =>",e)
    }
    
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
          this.dbObj = db;
          console.log(this.database_name, 'Database Created!');
          // console.log("DB Obj",this.dbObj)
  
  
          // creating table
          this.dbObj
          .executeSql(
            `
        CREATE TABLE IF NOT EXISTS ${this.table_name}  (
          user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
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
    })
    .catch((e)=>{
      console.log("Platform error",e)
    })

    
    
  }

}
