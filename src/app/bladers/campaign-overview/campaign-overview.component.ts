import {Component, OnDestroy, OnInit} from '@angular/core';
import { Base } from "../blader/models";
import { BladeManager } from "../blader/bladeManager.service";
import {SharedService} from "../../services/shared.service";
import {MyAppService} from "../../services/my-app.service";
import {Router} from "@angular/router";
import {SubscribersList} from "../../interfaces/subscribers-list-item";

@Component({
  selector: 'app-campaign-overview',
  template: `
    <div class="buttons">
      <button  mat-button (click)="selectedButton(button1)">
        <i class="material-icons">{{button1 | lowercase}}</i>
        <span class="btnSpan">{{button1}}</span>
      </button>

      <button class="button2" mat-button (click)="selectedButton(button2)">
        <i class="material-icons">content_copy</i>
        <span class="btnSpan">{{button2}}</span>
      </button>

      <button class="button3" mat-button  (click)="selectedButton(button3)">
        <i class="material-icons">donut_small</i>
        <span class="btnSpan">{{button3}}</span>
      </button>

      <button class="button4" mat-button (click)="selectedButton(button4)">
        <i class="material-icons"> track_changes</i>
        <span class="btnSpan">{{button4}}</span>
      </button>

      <button class="button4" mat-button (click)="selectedButton(button5)">
        <i class="material-icons">visibility</i>
        <span class="btnSpan">{{button5}}</span>
      </button>
    </div>
      
    <div class="content">
      <div class="header">
        <span class="campaign-text">Campaign: <strong>{{campaign}}</strong></span>
        <span class="campaign-list">List: 
          <button mat-button (click)="open_list()" [routerLink]="['overview/details', list_id]">
          <strong>{{list_name}}</strong></button></span>
        <hr>
      </div>
    </div>
  `,
  styleUrls: ['./campaign-overview.component.css']
})
export class CampaignOverviewComponent implements Base, OnInit, OnDestroy {
  public id: number;
  public title;
  public description;
  public button1;
  public button2;
  public button3;
  public button4;
  public button5;
  public toolbar;
  public filter;
  public date;

  list_name: string;
  campaign: string;

  subscribers_list : SubscribersList[] = [];
  list_id : number;

  constructor(private mng: BladeManager, private sharedService: SharedService,
              private myAppService: MyAppService, private router: Router) {
    this.title = 'Campaign Overview';
    this.description = 'Inspect your campaign\'s performance';
    this.button1 = 'Refresh';
    this.button2 = 'Duplicate';
    this.button3 = 'Overview';
    this.button4 = 'Tracking';
    this.button5 = 'Preview';
    this.toolbar = false;
    this.filter = false;
    this.date = false;
  }

  ngOnInit() {
    this.list_name = this.sharedService.list_name;
    this.campaign = this.sharedService.campaign;

    this.myAppService.getAllSubscribersList()
        .subscribe(
      data => {
        this.subscribers_list = data;
        for(let item of this.subscribers_list) {
          if(item.title == this.sharedService.list_name) {
            this.list_id = item.id;
          }
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.id == this.myAppService.getSelectedClosingBlade()) {
      this.mng.remove(this.id);
      this.router.navigateByUrl('/campaigns/messaging');
    }
  }

  selectedButton(button: string) {
    //console.log(`Selected btn ${button}`);
  }

  open_list(){
    if(this.myAppService.getHistory().length <= 2) {
      this.sharedService.subscribers_list_name = this.list_name;
      this.mng.add('details');

    }
  }
}