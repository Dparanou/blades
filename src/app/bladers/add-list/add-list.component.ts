import {Component, OnInit, OnDestroy, OnChanges, HostListener, ComponentRef, ViewContainerRef} from '@angular/core';
import {Base} from "../blader/models";
import {Router, ActivatedRoute} from "@angular/router";
import {BladeManager} from "../blader/bladeManager.service";
import {MyAppService} from "../../services/my-app.service";

@Component({
  selector: 'app-add-list',
  template: `
    <div class="content">
        <div class="basic-list">
            <button mat-button class = "button-list-basic" [routerLink]="['create/basic']" (click)="openBasic()" [class.selected]="wasSelectedBasic">
                <i class="material-icons list-icon">list_alt</i>
                <h4 class="basic">Basic</h4>
                <p class="basic-disc">Create a basic list</p>
                <i class="material-icons arrow-icon">keyboard_arrow_right</i>
            </button>
         </div>
         
         <hr>
         
         <div class="advanced-list">
            <button mat-button class = "button-list-advanced" [routerLink]="['create/advanced']" (click)="openAdvanced()" [class.selected]="wasSelectedAdvanced">
                <i class="material-icons list-icon">list_alt</i>
                <h4 class="advanced">Advanced</h4>
                <p class="advanced-disc">Create an advanced list</p>
                <i class="material-icons arrow-icon">keyboard_arrow_right</i>
            </button>
         </div>
         
         <hr class="second">
      
    </div>
`,
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements Base, OnDestroy {

  public id : number;
  public title;
  public description;
  public toolbar;
  public filter;
  public date;

  wasSelectedBasic : boolean;
  wasSelectedAdvanced : boolean;

  constructor(private router : Router, private mgr : BladeManager,
              private route : ActivatedRoute, private myAppService : MyAppService) {
    this.title = 'List Type';
    this.description = 'Select your preferred list type';
    this.toolbar = false;
    this.filter = false;
    this.date = false;

    this.myAppService.getLastTitle().subscribe(
        data => {
          if(data == 'basic' || data == 'advanced') {
            this.wasSelectedBasic = false;
            this.wasSelectedAdvanced = false;
          }
        }
    );
  }

  ngOnDestroy() {
      if (this.id  == this.myAppService.getSelectedClosingBlade()) {
        this.router.navigateByUrl('/subscribers/lists');
      }
  }

  openBasic() {
    this.wasSelectedBasic = true;
    this.wasSelectedAdvanced = false;

    if (this.myAppService.getHistory().length == 2) {
      this.mgr.add('basic');
    } //If Advanced List blade is open
    else {
      let id = this.myAppService.popFromHistory();
      this.mgr.remove(id);
      //console.log("navigate to basic and close advanced!");
      this.wasSelectedBasic = true;
      this.wasSelectedAdvanced = false;
      this.mgr.add('basic');
    }
  }

  openAdvanced() {
    this.wasSelectedBasic = false;
    this.wasSelectedAdvanced = true;

    if (this.myAppService.getHistory().length == 2) {
      this.mgr.add('advanced');
    } //If Basic List blade is open
    else {
      let id = this.myAppService.popFromHistory();
      this.mgr.remove(id);
      //console.log("navigate to advanced and close basic");
      this.wasSelectedBasic = false;
      this.wasSelectedAdvanced = true;
      this.mgr.add('advanced');
    }
  }
}

