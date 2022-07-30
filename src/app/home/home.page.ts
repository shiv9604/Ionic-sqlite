import { SqliteService } from './../services/sqlite.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// export class HomePage implements OnInit {
//   userForm = new FormGroup({
//     name: new FormControl('', [Validators.required]),
//     pass: new FormControl('', [Validators.required]),
//   });

//   user:any = {}
//   usersData:any;
//   dummyData:any = [
//     {
//       id:1,
//       name:"Shiv",
//       pass:"test@123"
//     },
//     {
//       id:2,
//       name:"Rahul",
//       pass:"app@123"
//     },
//     {
//       id:3,
//       name:"Pratik",
//       pass:"p@123"
//     },
//     {
//       id:4,
//       name:"mahesh",
//       pass:"pass"
//     },
//     {
//       id:5,
//       name:"rohan",
//       pass:"rk@123"
//     },
//   ];

//   constructor(public sql:SqliteService) {
//   }

//   ngOnInit(){
//     this.getUsers()
//   }

//   async getUsers(){
//     this.usersData = await this.sql.getData()
//     console.log("Users Data Got",this.usersData)
//   }

//    async createUser(){
//     let {name,pass} = this.userForm.value
//     console.log("name:",name);
//     console.log("pass:",pass);

//     let data = await this.sql.postData(name,pass)
//     console.log("Empty Arrayss",data)
//     this.getUsers()
//   }

//   updateUser(id,userObj){
//     this.sql.updateData(id,userObj) 
//   }

//   deleteUser(id){
//     this.sql.deleteData(id)
//   }
//   clearForm(){
//     this.userForm.reset()
//     console.log("Form Cleared...")
//   }

//   assinDummyData(){
//     setTimeout(()=>{
//       this.usersData = this.dummyData
//       console.log("Dummy Data Assigned...")
//     },3000) 
//   }

// }
















export class HomePage implements OnInit {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });

  user:any = {}
  usersData:any;
  dummyData:any = [
    {
      id:1,
      name:"Shiv",
      pass:"test@123"
    },
    {
      id:2,
      name:"Rahul",
      pass:"app@123"
    },
    {
      id:3,
      name:"Pratik",
      pass:"p@123"
    },
    {
      id:4,
      name:"mahesh",
      pass:"pass"
    },
    {
      id:5,
      name:"rohan",
      pass:"rk@123"
    },
  ];

  constructor(public sql:SqliteService) {
  }

<<<<<<< HEAD
  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.getUsers();
=======
  ngOnInit(){
    this.getUsers()
>>>>>>> insertion-done
  }
  

<<<<<<< HEAD
  getUsers(){
    this.usersData = this.sql.getData()
    // this.getUsersList()
=======
  async getUsers(){
    this.usersData = await this.sql.getData()
>>>>>>> insertion-done
    console.log("Users Data Got",this.usersData)
   }

<<<<<<< HEAD
   createUser(){
    let {name,pass} = this.userForm.value
    console.log("name:",name)
    console.log("pass:",pass)
    this.sql.postData(name,pass)
    this.clearForm()
=======
   async createUser(){
    let {name,pass} = this.dummyData[0]
    console.log("Creating User...")
    console.log("name:",name);
    console.log("pass:",pass);

    let data = await this.sql.postData(name,pass)
    console.log("Empty Arrayss",data)
    this.getUsers()
>>>>>>> insertion-done
  }

  updateUser(id?,userObj?){
    let userobj = this.dummyData[1]
    userobj['id'] = 2
    let {userId} = userobj

    console.log("Updating Obj",userobj)
    this.sql.updateData(userId,userobj) 
  }

  deleteUser(id?){
    let {id:userId} = this.dummyData[0]
    console.log("Deleting User of Id : ",userId)
    this.sql.deleteData(userId)
  }

  clearForm(){
    this.userForm.reset()
    console.log("Form Cleared...")
  }

<<<<<<< HEAD
  getUsersList(){
    this.usersData = this.sql.data
  }

}










// export class HomePage implements OnInit {
//   userForm = new FormGroup({
//     name: new FormControl('', [Validators.required]),
//     pass: new FormControl('', [Validators.required]),
//   });

//   user:any = {}
//   usersData:any;


//   // Service Variables
  
//   dbObj: SQLiteObject;
//   readonly database_name: string = 'users.db';
//   readonly table_name: string = 'usersdata';

//   name_model: string = '';
//   data: any = [];
//   userInfo: any;
//   isDbTableCreated: boolean = false;

//    constructor(
//     public sqlite: SQLite,
//     public platform: Platform
//   ) {
//     this.platform.ready().then(() => {
//       this.createDBAndTable();
//     }).catch(error => {
//       console.log(error);
//     })
//   }

//   ngOnInit() {
    
//   }

//   ionViewDidEnter(){
//    this.getData()
//   }

//   createDBAndTable() {
//     this.platform.ready().then(() => {
//       this.sqlite.create({
//           name: this.database_name,
//           location: 'default'
//         }).then((sqLite: SQLiteObject) => {
//           this.dbObj = sqLite;
//           sqLite.executeSql(`
//               CREATE TABLE IF NOT EXISTS ${this.table_name} (
//                 user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
//                 name varchar(255),
//                 pass varchar(255)
//               )`, [])
//             .then((res) => {
//               console.log(JSON.stringify(res));
//               this.isDbTableCreated = true
//               console.log("Table Created",this.isDbTableCreated)
//             })
//             .catch((error) => alert(JSON.stringify(error)));

//         })
//         .catch((error) => alert(JSON.stringify(error)));
//     }); 
//   }
    

//   waitForDBAndTable() {
//     if (!this.isDbTableCreated) {
//       this.createDBAndTable()
//     }
//     else {
//       console.log("DB and Table Already present")
//     }
//   }


//   getData(){
//     if (this.isDbTableCreated) {
//       this.dbObj.executeSql(`SELECT * FROM ${this.table_name}`, []).then((res) => {
//         console.log(res.rows.length)
//         if (res.rows.length > 0) {
//           for (var i = 0; i < res.rows.length; i++) {
            
//             // res.rows.item(i) is function which returns row as per the arguement. 
//             this.data.push(res.rows.item(i));
//           }
//           console.log("Get Data Called in service...",this.data);
         
//         }
//       },(e) => {  
//         alert(JSON.stringify(e));
//       });
//     }
//     else {
//       console.log("Database Not Created, Cant get Users Data")
//     }
//     return this.data;
//   }

//   postData(){

//     let {name,pass} = this.userForm.value
//     console.log("Name :",name)
//     console.log("Password :",pass)

//     if (this.isDbTableCreated) {
//       this.dbObj.executeSql(`
//       INSERT INTO ${this.table_name} (name, pass) VALUES ('${name}', '${pass}')`, [])
//         .then(() => {
//           console.log("Insertec Successfully");
//           this.getData();
//         }, (e) => {
//           console.log("Insertion Failed",JSON.stringify(e));
//         });
//     }
//     else {
//       console.log("Database Not Created, Cant Post Users Data")
//     }

//   }

//   deleteData(id){

//     if (this.isDbTableCreated) {
//       this.dbObj.executeSql(`DELETE FROM ${this.table_name} WHERE ID=${id}`, [])
//         .then((res) => {
//           console.log("Deleted From Table", res)
//         })
//         .catch((e) => {
//           console.log("Failed to delete row", JSON.stringify(e))
//         })
//     }
//     else {
//       console.log("Database Not Created, Cant delete Users Data")
//     }
//   }

//   updateData(id, userObj){
//     if (this.isDbTableCreated) {
//       this.dbObj.executeSql(`UPDATE ${this.table_name} SET Name=${userObj.name} Email=${userObj.email} Password=${userObj.pass} WHERE id=${id}`, [])
//         .then((res) => {
//           console.log("User Updated Sucessfully...", res)
//         })
//         .catch((e) => {
//           console.log("Failed to update user", JSON.stringify(e))
//         })
//     }
//     else {
//       console.log("Database Not Created, Cant Update Users Data")
//     }

//   }

//   dropTable(){
//     this.dbObj.executeSql(`DROP ${this.table_name}`, [])
//       .then((res) => {
//         console.log("Table Deleted", res)
//       })
//       .catch((e) => {
//         console.log("Err occured while deleting table", e)
//       })
//   }
  


// }
=======
  assinDummyData(){
    setTimeout(()=>{
      this.usersData = this.dummyData
      console.log("Dummy Data Assigned...")
    },3000) 
  }

}
>>>>>>> insertion-done
