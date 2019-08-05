import { Component, OnInit } from '@angular/core';
import {Base} from "../blader/models";
import {BladeManager} from "../blader/bladeManager.service";

@Component({
  selector: 'app-profile',
  template: `
    <div class="content">
      <div>
        <button mat-button class="account">
          <p>Account</p>
          <i class="material-icons arrow-icon">keyboard_arrow_right</i>
        </button>
      </div>
      
      <hr>
      
      <div>
        <button mat-button class="user">
          <p>User</p>
          <i class="material-icons arrow-icon">keyboard_arrow_right</i>          
        </button>
      </div>
      
      <hr>
      
      <div>
        <button mat-button class="orders">
          <p>Orders</p>
          <i class="material-icons arrow-icon">keyboard_arrow_right</i>          
        </button>
      </div>
      
      <hr>
    </div>`,
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements Base{
  public id : number;
  public title;
  public toolbar;
  public filter;
  public date;

  constructor(private mng : BladeManager) {
    this.title = 'Profile';
    this.toolbar = false;
    this.filter = false;
    this.date = false;
  }


}
