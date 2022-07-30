import { isDataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

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
  isDbTableCreated: boolean = false;

  constructor(
    public sqlite: SQLite,
    public platform: Platform
  ) {
    
  }

  ngOnInit() {

  }

  createDBAndTable() {
    this.platform.ready().then(() => {
      this.sqlite.create({
          name: this.database_name,
          location: 'default'
        }).then((sqLite: SQLiteObject) => {
          this.dbObj = sqLite;
          console.log("Database Created")
          sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.table_name} (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name varchar(255),
                pass varchar(255)
              )`, [])
            .then((res) => {
              // console.log(JSON.stringify(res));
              this.isDbTableCreated = true
              console.log("Table Created",this.isDbTableCreated)
            })
            .catch((error) => alert(JSON.stringify(error)));

        })
        .catch((error) => alert(JSON.stringify(error)));
    }); 
  }
    





  waitForDBAndTable() {
    if (!this.isDbTableCreated) {
      this.createDBAndTable()
    }
    else {
      console.log("DB and Table Already present")
    }
  }


  getData(){
    return this.dbObj.executeSql(`SELECT * FROM ${this.table_name}`, [])
    .then((res) => {
      this.data = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          // console.log(i) 
          
          // res.rows.item(i) is function which returns row as per the arguement. 
          this.data.push(res.rows.item(i));
        }
        console.log("Data Get Function CAlled",this.data);
        return this.data
      }
      console.log("GET",res)
    },(e) => {
      alert(JSON.stringify(e));
    });
  }

  postData(name, pass){
      this.dbObj.executeSql(`
      INSERT INTO ${this.table_name} (name, pass) VALUES ('${name}', '${pass}')`, [])
        .then(async (res) => {
          console.log("Inserted Successfully",res);
          let getData = await this.getData();
          console.log("Data got in post func",getData)
          return getData
        }, (e) => {
          console.log("Insertion Failed",JSON.stringify(e));
        });
  }

  deleteData(id){
      this.dbObj.executeSql(`DELETE FROM ${this.table_name} WHERE user_id=${id}`, [])
        .then((res) => {
          console.log("Deleted From Table", res)
        })
        .catch((e) => {
          console.log("Failed to delete row", JSON.stringify(e))
        })
  }

  updateData(id, userObj){

      // this.dbObj.executeSql(`UPDATE ${this.table_name} SET name=?, pass=? WHERE user_id=${id}`, [userObj.name,userObj.pass])
      
      this.dbObj.executeSql(`UPDATE ${this.table_name} SET name=?, pass=? WHERE user_id=?`,[userObj.name,userObj.pass,id])
        .then((res) => {
          console.log("User Updated Sucessfully...", res)
        })
        .catch((e) => {
          console.log("Failed to update user", JSON.stringify(e))
        })
  }

  dropTable(){
    this.dbObj.executeSql(`DROP ${this.table_name}`, [])
      .then((res) => {
        console.log("Table Deleted", res)
      })
      .catch((e) => {
        console.log("Err occured while deleting table", e)
      })
  }

}
