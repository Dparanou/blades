import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {MyAppService} from "../services/my-app.service";


@Component({
  selector: 'app-main-content',
  template: `
    <div class="content" [@slide]="menuState"> 
    <router-outlet></router-outlet>
    </div>`,
  styles: [`.content {
    position: relative;
    width: 100vh;
    top: 5vh;
    display: flex;
    flex: 1;
  }`],
  animations: [
     trigger('slide', [
         state('in', style({
             "left" : "4.4em"
         })),
         state('out', style({
             "left" : "10.6em"
         })),
         transition('in => out', animate('300ms ease-in')),
         transition('out => in', animate('300ms ease-out'))
     ])]
})
export class MainContentComponent implements OnInit {
    menuState : string;

   constructor(private myAppService : MyAppService) {}

  ngOnInit() {
      this.myAppService.currentMenuState.subscribe(menuState => this.menuState = menuState);
  }
}