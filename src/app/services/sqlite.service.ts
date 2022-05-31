
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
    // this.platform.ready().then(() => {
    //   this.createDBAndTable();
    // }).catch(error => {
    //   console.log(error);
    // })
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
          sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.table_name} (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name varchar(255),
                pass varchar(255)
              )`, [])
            .then((res) => {
              console.log(JSON.stringify(res));
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
    console.log("get",this.isDbTableCreated,"***",`SELECT * FROM ${this.table_name}`)
    if (this.isDbTableCreated) {
      this.dbObj.executeSql(`SELECT * FROM ${this.table_name}`, []).then((res) => {
        // this.data = [];
        console.log(res.rows.length)
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            
            // res.rows.item(i) is function which returns row as per the arguement. 
            this.data.push(res.rows.item(i));
          }
          console.log("Get Data Called in service...",this.data);
         
        }
      },(e) => {  
        alert(JSON.stringify(e));
      });
    }
    else {
      console.log("Database Not Created, Cant get Users Data")
    }
    return this.data;
  }

  postData(name, pass){
    if (this.isDbTableCreated) {
      this.dbObj.executeSql(`
      INSERT INTO ${this.table_name} (name, pass) VALUES ('${name}', '${pass}')`, [])
        .then(() => {
          console.log("Insertec Successfully");
          this.getData();
        }, (e) => {
          console.log("Insertion Failed",JSON.stringify(e));
        });
    }
    else {
      console.log("Database Not Created, Cant Post Users Data")
    }

  }

  deleteData(id){

    if (this.isDbTableCreated) {
      this.dbObj.executeSql(`DELETE FROM ${this.table_name} WHERE ID=${id}`, [])
        .then((res) => {
          console.log("Deleted From Table", res)
        })
        .catch((e) => {
          console.log("Failed to delete row", JSON.stringify(e))
        })
    }
    else {
      console.log("Database Not Created, Cant delete Users Data")
    }
  }

  updateData(id, userObj){
    if (this.isDbTableCreated) {
      this.dbObj.executeSql(`UPDATE ${this.table_name} SET Name=${userObj.name} Email=${userObj.email} Password=${userObj.pass} WHERE id=${id}`, [])
        .then((res) => {
          console.log("User Updated Sucessfully...", res)
        })
        .catch((e) => {
          console.log("Failed to update user", JSON.stringify(e))
        })
    }
    else {
      console.log("Database Not Created, Cant Update Users Data")
    }

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
