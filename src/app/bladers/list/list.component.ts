import {Component, OnInit} from '@angular/core';
import { Base } from "../blader/models";
import {Router, ActivatedRoute} from "@angular/router";
import {BladeManager} from "../blader/bladeManager.service";
import {MyAppService} from "../../services/my-app.service";
import {SubscribersList} from "../../interfaces/subscribers-list-item";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-list',
  template: `
    <div class="buttons">
        <button  mat-button (click)="selectedButton(button1)" >
            <i class="material-icons header-icon">{{button1}}</i>
            <span class="header-span">{{button1 | firstUpper}}</span>
        </button>
        
        <button class="button2" mat-button (click)="selectedButton(button2)" [routerLink]="['create']">
            <i class="material-icons header-icon">{{button2}}</i>
            <span class="header-span">{{button2 | firstUpper}}</span>
        </button>
    </div>

    <div class="content">
        <ul>
            <li *ngFor="let sub of subscribers_list">
                <button mat-button class="delete" (click)="deleteList(sub.id)">
                    <i class="material-icons">delete</i>
                </button>
                <button mat-button class="list-btn" (click)="selectedList(sub.id, sub.title)" [routerLink]="['details', sub.id]">
                    <span class="sub-title">{{sub.title}}</span>
                    <span class="sub-label" *ngIf="sub.label"> {{sub.label}}</span>
                    <span class="sub-updated">udpated</span>
                    
                    <span class="sub-num">{{sub.numOfSubs}}</span>
                    <span class="sub-sub">subscribers</span>
                    <i class="material-icons sub-arrow">keyboard_arrow_right</i>
                </button>
                <hr>
            </li>    
        </ul>
    </div>    `,
  styleUrls: ['list.component.css']
})
export class ListComponent implements Base, OnInit {
    public id : number;
    public title;
    public description;
    public button1 = 'refresh';
    public button2 = 'add';
    public toolbar;
    public filter;
    public date;

    subscribers_list : SubscribersList[];
    error : string;

    constructor(private mng : BladeManager, private myAppService : MyAppService,
                private router : Router, private route : ActivatedRoute,
                private sharedService : SharedService) {
        this.title = 'Lists';
        this.description = 'Overview';
        this.toolbar = true;
        this.filter = true;
        this.date = false;
    }

    ngOnInit() {
        this.myAppService.getAllSubscribersList()
            .subscribe(
                data => this.subscribers_list = data,
                error => this.error = error.statusText
            );

        this.myAppService.newListSubscribers
            .subscribe(
                data => this.subscribers_list = [data, ...this.subscribers_list]
            );
    }

   selectedButton(btn : string) {
      //console.log('Selected button ' + btn);
      if(btn == 'add') {
          //console.log("Add button!");
          //this.dis = true;
          if(this.myAppService.getHistory().length <= 1) {
              this.mng.add('create');

          }
      }
      else if(btn == 'refresh') {
          console.log("refresh");
          //this.router.navigateByUrl('subscribers/lists');
      }

    }

    selectedList(subId : number, subTitle: string) {
        if(this.myAppService.getHistory().length == 1) {
            this.sharedService.subscribers_list_name = subTitle;
            this.mng.add('details');
        }
        else {
            let id = this.myAppService.popFromHistory();
            this.mng.remove(id);
            this.sharedService.subscribers_list_name = subTitle;
            this.mng.add('details');
        }
    }

    deleteList(id : number) {
        console.log("Deleting " + id);
        //this.myAppService.deleteListId(id).subscribe();
    }
}
