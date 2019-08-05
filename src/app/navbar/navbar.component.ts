import {Component, OnInit, OnChanges, AfterViewInit} from '@angular/core';
import {MyAppService} from "../services/my-app.service";
import {NavigationEnd, Router} from "@angular/router";
import {BladeManager} from "../bladers/blader/bladeManager.service";
import {BaseContext} from "../bladers/blader/models";


@Component({
  selector : 'app-navbar',
  template :
      `<mat-toolbar>
        <div class="logo">
        </div>
         <div class="logoName">
        </div>

          <div class="selected-tab-name">
            <span class="selected-tab">{{page}}</span>
           </div>

          <div class="info">
          <i class="material-icons">
            power_settings_new
          </i>
        </div>
    </mat-toolbar>`,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  page : string;

  constructor( private router : Router) {
    this.router.events.subscribe(
        (event: any) => {
          if(event instanceof NavigationEnd) {
            //console.log(this.router.url);
            this.page = '';
            let str : string[] = this.router.url.split('/');

            //if is Dashboard
            if(str[1] == 'dashboard') {
              this.page += str[1].charAt(0).toUpperCase() + str[1].slice(1);
            } else if(str[1] == 'profile') {
              this.page += str[1].charAt(0).toUpperCase() + str[1].slice(1);
            }
            else {
              str = str.splice(2, str.length);
              this.editPagePath(str);
            }
          }
        }
    );
  }

  editPagePath(str : string[]) {
    let j = 0;
    for (let i in str) {
      if(Number(str[i]))
        continue;

      if(j != 0)
        this.page += ' > ';

      if(str[i].includes(';') ) {
        let s = str[i].split(';');
        str[i] = s[0];
      }

      this.page += str[i].charAt(0).toUpperCase() + str[i].slice(1);
      j++;
    }
  }
}
