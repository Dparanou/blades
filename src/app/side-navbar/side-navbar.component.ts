///<reference path="../../../node_modules/@angular/animations/src/animation_metadata.d.ts"/>
import {Component, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MatSidenav} from "@angular/material";
import {MyAppService} from "../services/my-app.service";

@Component({
  selector: 'app-side-navbar',
  host: {'class' : 'side-navbar '},
  template:
      `<div id="wrapper">
         <mat-sidenav #sidenav [mode]="side" opened [@slideInOut]="menuState">
            <div class="menu" (click)="toggle()">
              <i class="material-icons" *ngIf="menuState=='in'">
                menu
            </i>
            <i class="material-icons" *ngIf="menuState=='out'">
                close
            </i>
           </div>
            <hr [@slideInOut]="menuState">
  
            <div class="otherLogos">
               <app-tree-list [menuState]="menuState"></app-tree-list>
            </div>
            
           <hr [@slideInOut]="menuState">
        </mat-sidenav>
       </div>
       `,
  styleUrls: ['./side-navbar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        "width" : "4.4em"
      })),
      state('out', style({
        "width" : "10.6em"
      })),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out'))
    ])
  ]
})

export class SideNavbarComponent implements OnInit {

  public menuState : string;

  @ViewChild('sidenav', {static :false}) sidenav : MatSidenav;

  constructor(private myAppService : MyAppService) {}

  toggle() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.myAppService.changeMenuState(this.menuState);
  }

  ngOnInit() {
    this.sidenav.open();
    this.myAppService.currentMenuState.subscribe(menuState => this.menuState = menuState);
  }



}
