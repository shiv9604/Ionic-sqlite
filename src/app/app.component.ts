import { SqliteService } from './services/sqlite.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public platform:Platform,
    public sql:SqliteService
    ) {
      this.initialize()
    }

  async initialize(){
    await this.platform.ready().then((res)=>{
     this.sql.waitForDBAndTable();  
    })
  }


}
