import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {BladerComponent} from "./blader.component";
import {BladeManager} from "./bladeManager.service";
import {
    MatProgressBarModule, MatNativeDateModule, MatInputModule, MatDatepickerModule,
    MatFormFieldModule, MatButtonModule, MatIconModule, MatTreeModule, MatSidenavModule, MatToolbarModule
} from "@angular/material";
import { AddListComponent, DetailsSubscribersComponent, BasicListComponent,
    AdvancedListComponent, DashboardComponent, CampaignOverviewComponent,
    BaseComponent } from '..';

const BLADER_ROUTES = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //automatically navigate to Dashboard
    { path: 'dashboard', component: DashboardComponent },
    { path: 'subscribers/lists', component: BladerComponent, data :{kind : 'lists', addDynamicChild: true},
        children : [
            { path : 'create', component : AddListComponent, data :{kind : 'create'},
                children : [
                    { path : 'basic', component : BasicListComponent, data :{kind : 'basic'}},
                    { path : 'advanced', component : AdvancedListComponent, data :{kind : 'advanced'}}
                ]},
            { path : 'details/:id', component : DetailsSubscribersComponent, data :{kind : 'create'}},
        ]},
    { path: 'subscribers/blocked', component: BladerComponent, data :{kind : 'blocked'}},
    { path: 'campaigns/messaging', component: BladerComponent, data :{kind : 'campaigns'},
        children : [
            { path : 'overview', component : CampaignOverviewComponent, children : [
                    { path : 'details/:id', component : DetailsSubscribersComponent, data :{kind : 'create'}},
                ]}
        ]},
    { path: 'profile', component: BladerComponent, data :{kind : 'list'}},
];

const modules = [
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressBarModule
];

@NgModule({
    declarations: [
        BaseComponent,
        BladerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(BLADER_ROUTES),
        modules
    ],
    providers: [
        BladeManager
    ],
    exports: [
        BladerComponent
    ]
})

export class BladerModule { }