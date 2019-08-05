import {Component, OnInit, OnDestroy} from '@angular/core';
import {Base} from "../blader/models";
import {BladeManager} from "../blader/bladeManager.service";
import {Router, ActivatedRoute} from "@angular/router";
import {MyAppService} from "../../services/my-app.service";
import {SubscribersList} from "../../interfaces/subscribers-list-item";
import {SharedService} from "../../services/shared.service";
import {Subscriber} from "../../interfaces/subscriber";

@Component({
  selector: 'app-details-subscribers',
  template: `
   <div class="buttons" id="focusBlade">
        <button  mat-button (click)="selectedButton(button1)" >
            <i class="material-icons header-icon">{{button1}}</i>
            <span class="header-span">{{button1 | firstUpper}}</span>
        </button>
        
        <button class="button2" mat-button (click)="selectedButton(button2)">
            <i class="material-icons header-icon">{{button2}}</i>
            <span class="header-span">{{button2 | firstUpper}}</span>
        </button>
        
        <button class="button3" mat-button (click)="selectedButton(button3)">
            <i class="material-icons header-icon">{{button3}}</i>
            <span class="header-span">{{button3 | firstUpper}}</span>
        </button>
        
        <button class="button4" mat-button (click)="selectedButton(button4)">
            <i class="material-icons header-icon">backup</i>
            <span class="header-span">{{button4 | firstUpper}}</span>
        </button>
        
        <button class="button5" mat-button (click)="selectedButton(button5)">
            <i class="material-icons header-icon">{{button5}}</i>
            <span class="header-span">{{button5 | firstUpper}}</span>
        </button>
        
        <button class="button6" mat-button (click)="selectedButton(button6)">
            <i class="material-icons header-icon">list</i>
            <span class="header-span">{{button6 | firstUpper}}</span>
        </button>
        
        <button class="button7" mat-button (click)="selectedButton(button7)">
            <i class="material-icons header-icon">attach_file</i>
            <span class="header-span">{{button7 | firstUpper}}</span>
        </button>
        
        <button class="button8" mat-button (click)="selectedButton(button8)">
            <i class="material-icons header-icon">more_vert</i>
            <span class="header-span">{{button8 | firstUpper}}</span>
        </button>
    </div>
      
      <div class="content">
        <div *ngFor="let item of subscribers_list">
          <div *ngIf="(item.numOfSubs == 0 && item.title==list)">
            <img src="../../../assets/images/no_data.png" alt="No data image">
            <p>No Data</p>
          </div>
        </div>
          <div *ngFor="let item of subscribers_list; let i = index">
            <div *ngIf="item.numOfSubs != 0 && item.title==list">
              <ul class="hd-title" >
                <li class="hd-li" *ngFor="let item of head">{{item}} <i class="material-icons hd">keyboard_arrow_down</i></li>
              </ul>
              
              <hr>
            </div>
          </div>
        
          <div *ngIf="specified_subs" class="spec-subs">
            <ul class="sub-item-list">
              <li *ngFor="let item of specified_subs; let i = index" class="sub-item-li">
                <span class="sub-item-span">{{i}}</span>
                <span class="sub-item-span">{{item.phone }}</span>
                <span class="sub-item-span">{{item.firstName}}</span>
                <span class="sub-item-span">{{item.lastName}}</span>
              </li>
            </ul>
          </div>
      </div>
  `,
  styleUrls: ['./details-subscribers.component.css']
})
export class DetailsSubscribersComponent implements Base, OnInit, OnDestroy {
  public id: number;
  public title;
  public description;
  public button1 = 'refresh';
  public button2 = 'search';
  public button3 = 'add';
  public button4 = 'import';
  public button5 = 'settings';
  public button6 = 'segments';
  public button7 = 'export';
  public button8 = 'actions';
  public toolbar;
  public filter;
  public date;

  subscribers_list: SubscribersList[];
  error: string;
  list: string;
  //subId: number;
  specified_subs: Subscriber[];

  private head: string[] = ['#', 'Destination', 'First Name', 'Last Name'];

  constructor(private mng: BladeManager, private router: Router,
              private route: ActivatedRoute, private myAppService: MyAppService,
              private sharedService: SharedService){
    //this.subId = route.firstChild.snapshot.params['id'];
    this.list = this.sharedService.subscribers_list_name;

    this.title = 'Subscribers';
    this.description = 'List: ' + this.list;
    this.toolbar = true;
    this.filter = true;
    this.date = false;
  }

  ngOnInit() {
    this.myAppService.getAllSubscribersList()
        .subscribe(
            data => {
              this.subscribers_list = data;
              for(let item of data ) {
                if (item.title == this.list && item.numOfSubs != 0) {
                  this.specified_subs = item.subscribers;
                }
              }
            },
            error => this.error = error.statusText
        );
    document.getElementById('focusBlade').scrollIntoView({
      behavior: 'smooth'
    });
  }

  ngOnDestroy() {
    if (this.id == this.myAppService.getSelectedClosingBlade()) {
      if (this.myAppService.getHistory().length == 1) {
        this.router.navigateByUrl('/subscribers/lists');
      } else {
        this.router.navigateByUrl('/campaigns/messaging/overview');
      }
    }
  }

  selectedButton(btn) {
  }
}