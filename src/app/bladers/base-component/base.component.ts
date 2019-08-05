import {
    Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ViewChild,
    OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BladeManager} from "../blader/bladeManager.service";
import {BaseContext, BaseArgs, BaseState} from "../blader/models";
import {MyAppService} from "../../services/my-app.service";
import {isNullOrUndefined} from "util";


@Component({
    selector: 'app-base',
    host: {
        class: 'blade'
    },
    template: `
    <div [ngClass]="blader" (click)="select()" #focusBlade>
        <div class="header">
            <p class="title">{{title}}</p>
            
            <p class="descritption" >{{description}}</p>
            
            <button mat-button [ngClass]="closeBtn" (click)="close()">
                <i class="material-icons">close</i>
            </button>
        </div>
        
        <div class="toolbar" *ngIf="toolbarSpace">
            <div class="filter" *ngIf="filter">
                <i class="material-icons">filter_list</i>
                <mat-form-field class="filter-picker">
                    <input matInput placeholder="Filter">
                </mat-form-field>
            </div>
            <div class="date" *ngIf="date">
               <<mat-form-field>
                  <input matInput [matDatepicker]="picker" placeholder="Choose a date">
                  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>
            </div>
            <hr class="toolbar-hr">
        </div>
        
        <div class="content">
            <ng-template #bladeContent></ng-template>  
        </div>
    </div>`,
    styleUrls: ['base.component.css']
})
export class BaseComponent implements OnInit, OnDestroy {
    private _componentRef: ComponentRef<any>;
    private _BaseState: BaseState = BaseState.default;
    public blader; //Object for bladerStyle
    public closeBtn; //Object for button Style
    public history: number[] = [];

    @Input() public context: BaseContext;

    @Output() public back: EventEmitter<BaseArgs> = new EventEmitter<BaseArgs>();

    @Output() public selected: EventEmitter<BaseArgs> = new EventEmitter<BaseArgs>();

    public get title(): string {
        return this._componentRef.instance.title;
    }

    public get description(): string {
        return this._componentRef.instance.description;
    }

    public get toolbarSpace(): boolean {
        if (this._componentRef.instance.toolbar != isNullOrUndefined)
            return this._componentRef.instance.toolbar;
        return;
    }

    public get filter(): boolean {
        if (this._componentRef.instance.filter != isNullOrUndefined)
            return this._componentRef.instance.filter;
        return;
    }

    public get date(): boolean {
        if (this._componentRef.instance.date != isNullOrUndefined)
            return this._componentRef.instance.date;
        return;
    }

    @ViewChild('bladeContent', {read: ViewContainerRef, static: false})
    protected bladeContent: ViewContainerRef;

    public constructor(
        private mgr: BladeManager, private router: Router,
        private myAppService: MyAppService) {
    }

    public ngOnInit(): void {
        if (this.context) {
            const factory = this.context.metaData.factoryFn
                ? this.context.metaData.factoryFn()
                : this.bladeContent.injector
                    .get(ComponentFactoryResolver)
                    .resolveComponentFactory(this.context.metaData.component);

            this._componentRef = this.bladeContent
                .createComponent(factory, this.bladeContent.length);
            this._componentRef.instance.id = this.context.id;

            this.myAppService.pushToHistory(this.context.id);

            this.history = this.myAppService.getHistory();
        }
        //Set size of each blade
        if (this._componentRef.instance.title == 'Blocked') {
            this._BaseState = BaseState.firstState;
        } else if (this._componentRef.instance.title == 'Subscribers') {
            this._BaseState = BaseState.secondState;
        } else if (this._componentRef.instance.title == 'Campaigns') {
            this._BaseState = BaseState.secondState;
        } else if (this._componentRef.instance.title == 'Campaign Overview') {
            this._BaseState = BaseState.firstState;
        }
        //set class for each state
        this.blader = {
            "wrapper": this._BaseState === 1,
            "wrapper2": this._BaseState === 2,
            "wrapper3": this._BaseState === 3,
        };

        this.closeBtn = {
            "close": this._BaseState === 1,
            "close2": this._BaseState === 2,
            "close3": this._BaseState === 3,
        };
    }

    public ngOnDestroy(): void {
        if (this._componentRef) {
            this._componentRef.destroy();
        }
    }

    public close() {
        this.back.next(this.context.toBaseArgs());
        this.myAppService.setSelectedClosingBlade(this.context.toBaseArgs().id);
        let index = this.history.indexOf(this.context.toBaseArgs().id);

        if (index == this.history.length - 1) {
            delete this.history[index];
            this.myAppService.informHistory(this.history);
        } else {
            while (index <= this.history.length - 1) {
                this.mgr.remove(this.history[index]);
                delete this.history[index];
                index++;
            }

            this.myAppService.informHistory(this.history);
        }

        //remove empty space from history list
        this.history = this.myAppService.getHistory().filter(function (el) {
            return el != null;
        });

        this.myAppService.informHistory(this.history);

        if (this.history.length == 0) {
            this.router.navigateByUrl('/dashboard');
        }
    }

    public select(): void {
        this.selected.next(this.context.toBaseArgs());
    }
}