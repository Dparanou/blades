import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BladerComponent} from "../blader/blader.component";
import {AddListComponent} from "..";
import {BasicListComponent} from "..";
import {AdvancedListComponent} from "..";
import {RouterModule} from '@angular/router';


const ROUTES_LIST  = [
  {path: '', component: BladerComponent, data :{kind : 'lists', addDynamicChild: true},
    children : [
      { path : 'create', component : AddListComponent, data :{kind : 'create'},
        children : [
          { path : 'basic', component : BasicListComponent, data :{kind : 'basic'}},
          { path : 'advanced', component : AdvancedListComponent, data :{kind : 'advanced'}}
        ]}
    ]}
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
export class ListModule { }
