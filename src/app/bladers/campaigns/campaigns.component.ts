import { Component, OnInit } from '@angular/core';
import {BladeManager} from "../blader/bladeManager.service";
import {Base} from "../blader/models";
import {MyAppService} from "../../services/my-app.service";
import {CampaignList} from "../../interfaces/campaign-list";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-campaigns',
  template: `
    <div class="buttons">
      <button  mat-button (click)="selectedButton(button1)">
        <i class="material-icons">{{button1 | lowercase}}</i>
        <span class="btnSpan">{{button1}}</span>
      </button>

      <button class="button2" mat-button (click)="selectedButton(button2)">
        <i class="material-icons">{{button2 | lowercase}}</i>
        <span class="btnSpan">{{button2}}</span>
      </button>

      <button class="button3" mat-button  (click)="selectedButton(button3)">
        <i class="material-icons">{{button3 | lowercase}}</i>
        <span class="btnSpan">{{button3}}</span>
      </button>
    </div>
    
    <div class="content">      
      <div *ngIf="campaign_list">
        <table>
          <thead>
            <tr>
              <th *ngFor="let item of head"> {{item}} <i class="material-icons hd">keyboard_arrow_down</i></th>
            </tr>
          </thead>
          <tbody>
            <tr  *ngFor="let item of campaign_list; let i = index" class="campaign-list" (click)="detailCampaign(item.campaign, item.listName)">
              <button mat-button class="tr-btn">
                <td>{{i + 1}} </td>
                <td>{{item.submittedDate}}</td>
                <td>{{item.dateSent}}</td>
                <td>{{item.campaign}}</td>
                <td>{{item.listName}}</td>
                <td>{{item.account}}</td>
                <td>{{item.channel}}</td>
                <td>{{item.recipients}}</td>
                <td>{{item.sendTotal}}</td>
                <td>{{item.progress}}</td>
                <td>{{item.status}}</td>
              </button>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['campaigns.component.css']
})
export class CampaignsComponent implements Base, OnInit {
  public id: number;
  public title;
  public description;
  public button1;
  public button2;
  public button3;
  public toolbar;
  public filter;
  public date;

  private head : string[] = [' # ', 'Submitted At', 'Date', 'Campaign', 'List Name',
                               'Account', 'Channel', 'Recipients', 'Sent/Total', 'Progress', 'Status'];

  private campaign_list : CampaignList[];
  constructor(private mng : BladeManager, private myAppService : MyAppService,
              private route : ActivatedRoute, private router : Router,
              private sharedService : SharedService) {
    this.title = 'Campaigns';
    this.description = 'List';
    this.button1 = 'Refresh';
    this.button2 = 'Search';
    this.button3 = 'Add';
    this.toolbar = true;
    this.filter = false;
    this.date = true;
  }

  ngOnInit() {
    this.myAppService.getAllCaimpaignList().subscribe(
      data => this.campaign_list = data
    );
  }

  selectedButton(btn) {}

  detailCampaign(campaign, listName) {

    if(this.myAppService.getHistory().length == 1) {
      this.sharedService.campaign = campaign;
      this.sharedService.list_name= listName;
      this.mng.add('overview');
      this.router.navigate(['overview'], {relativeTo: this.route});
    }
    else if (this.myAppService.getHistory().length == 2){
      let id = this.myAppService.popFromHistory();
      this.mng.remove(id);
      this.sharedService.campaign = campaign;
      this.sharedService.list_name= listName;
      this.mng.add('overview');
      this.router.navigate(['overview'], {relativeTo: this.route});
    }
  }
}