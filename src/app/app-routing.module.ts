import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules} from '@angular/router';
import {MainContentComponent} from "./main-content/main-content.component";
import {ListComponent, BlockedComponent, ProfileComponent,
    AddListComponent, DetailsSubscribersComponent, BasicListComponent,
    AdvancedListComponent, DashboardComponent, CampaignOverviewComponent,
    CampaignsComponent } from './bladers/index';
import {BladeRegistry} from "./bladers/blader/bladeRegistry.service";
import {BaseMetaData} from "./bladers/blader/models";
import {BladerModule} from "./bladers/blader/blader.module";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes = RouterModule.forRoot([

    { path: 'templates/active', component: MainContentComponent },
    { path: 'templates/archived', component: MainContentComponent },
    { path: 'campaigns/landing', component: MainContentComponent },
    { path: '**', component: NotFoundComponent}
] , { preloadingStrategy: PreloadAllModules} );


//() => import('./details-subscribers/details-subscribers.module').then(m => m.DetailsSubscribersModule)
//'./details-subscribers/details-subscribers.module'
@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        routes,
        BladerModule
    ],
    entryComponents: [
        DashboardComponent,
        ListComponent,
        BlockedComponent,
        CampaignsComponent,
        ProfileComponent,
        DetailsSubscribersComponent
    ]
})
export class AppRoutingModule {
    constructor (private bladeRegistry : BladeRegistry) {
        this.bladeRegistry.register(new BaseMetaData('lists', ListComponent));
        this.bladeRegistry.register(new BaseMetaData('blocked', BlockedComponent));
        this.bladeRegistry.register(new BaseMetaData('create', AddListComponent));
        this.bladeRegistry.register(new BaseMetaData('list', ProfileComponent));
        this.bladeRegistry.register(new BaseMetaData('details', DetailsSubscribersComponent));
        this.bladeRegistry.register(new BaseMetaData('basic', BasicListComponent));
        this.bladeRegistry.register(new BaseMetaData('advanced', AdvancedListComponent));
        this.bladeRegistry.register(new BaseMetaData('campaigns', CampaignsComponent));
        this.bladeRegistry.register(new BaseMetaData('overview', CampaignOverviewComponent));
    }
}
export const routingComponents = [MainContentComponent, DashboardComponent, ListComponent, AddListComponent,
                                BlockedComponent, ProfileComponent, DetailsSubscribersComponent,
                                BasicListComponent, AdvancedListComponent, CampaignsComponent, CampaignOverviewComponent];
