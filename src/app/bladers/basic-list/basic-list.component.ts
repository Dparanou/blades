import {Component, OnInit, OnDestroy} from '@angular/core';
import {Base} from "../blader/models";
import {BladeManager} from "../blader/bladeManager.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";
import {MyAppService} from "../../services/my-app.service";
import {SubscribersList} from "../../interfaces/subscribers-list-item";
import {Subscriber} from "../../interfaces/subscriber";

@Component({
  selector: 'app-basic-list',
  template: `
    <div class="basic-main">
      <h2>It's a classic. Don't you think?</h2>
      
      <img src="../../../assets/images/list.png" alt="list image">
      
      <div class="features">
        <p><b>Features</b></p>
        
        <ul>
          <li>Import unlimited number of subscribers</li>
          <li>Create and send SMS and Viber campaigns</li>
          <li>Add as many subscriber fields as you need</li>
          <li>Easily export your subscribers to an XLS or CSV file</li>
        </ul>
      </div>
      
      <div class="form-space">
        <mat-form-field>
          <label><span class="label">Title*</span></label>
          <input matInput type="text" [formControl]="titleListFormControl">
        </mat-form-field>
        <mat-error *ngIf="(titleListFormControl.invalid && titleListFormControl.dirty) || (titleListFormControl.touched && titleListFormControl.invalid)">
          This field is required
        </mat-error>
      </div>
      
      <div class="btn-space">
        <button mat-button type="submit" class="submit" (click)="onSubmit()" [disabled]="(titleListFormControl.invalid && titleListFormControl.dirty) || (titleListFormControl.touched && titleListFormControl.invalid) || titleListFormControl.pristine"
        [class.selected]="titleListFormControl.valid || !titleListFormControl.pristine && !(titleListFormControl.invalid && titleListFormControl.dirty)">
          <i class="material-icons">save</i>
          <span>Create</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./basic-list.component.css']
})
export class BasicListComponent implements Base, OnDestroy {
  public id: number;
  public title;
  public description;
  public toolbar;
  public filter;
  public date;

  data : SubscribersList = new class implements SubscribersList {
    id: number;
    subscribers: Subscriber;
    numOfSubs : number;
    title: string;
  };

  titleListFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private mng: BladeManager, private router: Router, private myAppService: MyAppService) {
    this.title = 'Basic List';
    this.description = 'Set name and create';
    this.toolbar = false;
    this.filter = false;
    this.date = false;
  }

  ngOnDestroy() {
    if (this.id == this.myAppService.getSelectedClosingBlade()) {
      //console.log("basic-list");
      this.mng.remove(this.id);
      this.router.navigateByUrl('/subscribers/lists/create');
    }
  }

  onSubmit() {
    // console.log(this.titleListFormControl.value);
    this.data.title = this.titleListFormControl.value;
    this.data.numOfSubs = 0;
    this.myAppService.addListId(this.data);

    this.mng.remove(this.id);
    this.router.navigateByUrl('/subscribers/lists/create');
  }
}