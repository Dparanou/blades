import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BladerComponent} from "../blader/blader.component";
import {RouterModule} from '@angular/router';
import {CampaignOverviewComponent} from "../campaign-overview/campaign-overview.component";
import {DetailsSubscribersComponent} from "../details-subscribers/details-subscribers.component";


const ROUTES_LIST  = [
  {path: '', component: BladerComponent, data :{kind : 'campaigns'},
    children : [
      { path : 'overview', component : CampaignOverviewComponent, children: [
          { path : 'details/:id', component : DetailsSubscribersComponent, data :{kind : 'create'}},
        ]},
    ]},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES_LIST),
  ],
  exports: [
    RouterModule,
  ]
})
export class CampaignsModule { }
