import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BladerComponent} from "../blader/blader.component";
import {RouterModule} from '@angular/router';
import {BaseComponent} from "..";


const ROUTES_LIST  = [
  {path: '', component: BladerComponent, data :{kind : 'blocked'}}
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES_LIST),

  ],
  exports: [
    RouterModule,
  ]
})
export class BlockedModule { }