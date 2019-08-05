import {Component, OnDestroy, OnInit} from '@angular/core';
import {Base} from "../blader/models";
import {FormControl, Validators} from "@angular/forms";
import {BladeManager} from "../blader/bladeManager.service";
import {Router} from "@angular/router";
import {MyAppService} from "../../services/my-app.service";
import {SubscribersList} from "../../interfaces/subscribers-list-item";
import {Subscriber} from "../../interfaces/subscriber";

@Component({
  selector: 'app-advanced-list',
  template: `
    <div class="basic-main">
      <h2>One list, unlimited possibilities</h2>

      <img src="../../../assets/images/list.png" alt="list image">

      <div class="features">
        <p><b>Features</b></p>

        <ul>
          <li>Create and send multichannel campaigns (SMS, Viber, Email)</li>
          <li>Collect new subscribers with sign up forms</li>
          <li>Easy-to-use tools to help you comply with GDPR regulation</li>
          <li>Create and publish landing pages in a few steps</li>
          <li>Measure the list growth through advanced reporting tools</li>
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
  styleUrls: ['./advanced-list.component.css']
})
export class AdvancedListComponent implements Base , OnDestroy {
  public id: number;
  public title;
  public description;
  public toolbar;
  public filter;
  public date;

  data: SubscribersList = new class implements SubscribersList {
    id: number;
    label: string;
    numOfSubs : number;
    subscribers: Subscriber;
    title: string;
  };

  titleListFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private mng: BladeManager, private router: Router, private myAppService: MyAppService) {
    this.title = 'Advanced List';
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
    this.data.label = "Advanced";
    this.data.title = this.titleListFormControl.value;
    this.data.numOfSubs = 0;
    this.myAppService.addListId(this.data);

    this.ngOnDestroy();
  }
}