import { Component, OnInit } from '@angular/core';
import {Base, BaseState} from "../blader/models";
import {BladeManager} from "../blader/bladeManager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MyAppService} from "../../services/my-app.service";

@Component({
  selector: 'app-blocked',
  template: `
    <div class="buttons">
        <button  mat-button (click)="selectedButton(button1)">
            <i class="material-icons">{{button1 | lowercase}}</i>
            <span>{{button1}}</span>
        </button>
        
        <button class="button2" mat-button (click)="selectedButton(button2)">
            <i class="material-icons">{{button2 | lowercase}}</i>
            <span>{{button2}}</span>
        </button>
        
        <button class="button3" mat-button  (click)="selectedButton(button3)">
            <i class="material-icons">{{button3 | lowercase}}</i>
            <span>{{button3}}</span>
        </button>
        
        <button class="button4" mat-button (click)="selectedButton(button4)" [disabled]="empty" >
            <i class="material-icons" [class.dis]="empty">{{button4 | lowercase}}</i>
            <span [class.dis]="empty">{{button4}}</span>
        </button>
    </div>
    
    <div class="content">
      <div class="noDataImage" *ngIf="empty">
        <img src="../../../assets/images/no_data.png" alt="No data image">
        <p>No Data</p>
      </div>
      
    </div>`,
  styleUrls: ['blocked.component.css']
})
export class BlockedComponent implements Base, OnInit {
  public id: number;
  public title;
  public button1;
  public button2;
  public button3;
  public button4;
  public toolbar;
  public filter;
  public date;

  list : any[];
  private empty : boolean = false;

  constructor(private mng : BladeManager, private myAppService:  MyAppService) {
    this.title = 'Blocked';
    this.button1 = 'Refresh';
    this.button2 = 'Search';
    this.button3 = 'Add';
    this.button4 = 'Delete';
    this.toolbar = true;
    this.filter = false;
    this.date = false;
  }

  ngOnInit(): void {
    this.myAppService.getAllSubscribersBlocked().subscribe(
        data => this.list = data
    );

    if(this.list == undefined) {
      this.empty = true;
    }
  }


  selectedButton(button : string) {
    //console.log(`Selected button ${button}`);
  }
}
