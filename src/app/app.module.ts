import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule, MatSidenavModule, MatIconModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
    MatDatepickerModule, MatProgressBarModule
} from '@angular/material';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { TreeListComponent } from './side-navbar/tree-list/tree-list.component';
import { MyAppService } from "./services/my-app.service";
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FirstUpperPipe } from './pipes/first-upper.pipe';
import { NotFoundComponent } from './not-found/not-found.component';

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
        AppComponent,
        NavbarComponent,
        SideNavbarComponent,
        TreeListComponent,
        FirstUpperPipe,
        routingComponents,
        NotFoundComponent
    ],
    imports: [
        modules,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        modules
    ],
    providers: [MyAppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
