import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {BladeManager} from "./bladeManager.service";
import {BaseArgs,  BaseContext} from "./models";
import {MyAppService} from "../../services/my-app.service";

@Component({
  selector: 'app-blader',
  template: `
    <div class="blader">
        <app-base
        *ngFor="let ctx of bladeContexts"
        [context]="ctx"
        (selected)="selectBlade($event)"
        (back)="back($event)"
        ></app-base>
    </div>
    `,
  styles: [`.blader { 
        display: flex;}`]
})

export class BladerComponent implements OnInit, OnDestroy {

    private entryComponentId: number;
    private unsubscribe: Subject<any> = new Subject<any>();

    public get bladeContexts() : Array<BaseContext> {
        return this.mgr.blades;
    }
    
    constructor(private route: ActivatedRoute, private mgr: BladeManager,
                private myAppService : MyAppService, private router : Router) {}

    ngOnInit() {
      this.route.data
          .subscribe( data => {
              //If refresh page, check if session storage exist
              let must = true;
              if (this.mgr.mustRestore) {
                  this.mgr.restore();
                  must = false;
              }
              //Remove All the blades from history, even if you select to Navigate from
              //Subscribers/lists/create to Subscribers/blocked
              //and reset session storage
              if (this.myAppService.getHistory().length != 0 && must) {
                this.mgr.reset();

                while (this.myAppService.getHistory().length != 0) {
                    let id = this.myAppService.popFromHistory();
                    this.mgr.remove(id);
                }
              }
              //If page not refreshing, allow to create entry component
              if (must) {
                switch(data.kind) {

                    case 'lists' : {
                        this.mgr.reset();
                        this.mgr.add('lists');
                        break;
                    }
                    case 'blocked' : {
                        this.mgr.reset();
                        this.mgr.add('blocked');
                        break;
                    }
                    case 'list' : {
                        this.mgr.reset();
                        this.mgr.add('list');
                        break;
                    }
                    case 'campaigns' : {
                        this.mgr.reset();
                        this.mgr.add('campaigns');
                        break;
                    }
                }
            }

              this.entryComponentId = this.mgr.entryId;
          });
    }

    ngOnDestroy() {
        this.mgr.reset();

        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public back(args: BaseArgs): void {
        //console.log(`closing blade: ${args.id}`);
        this.mgr.remove(args.id);
        if (this.myAppService.getHistory().length == 0) {
            this.router.navigateByUrl('/dashboard');
        }
    }

    public selectBlade(args: BaseArgs): number {
        if (this.mgr.selected
            && args.id === this.mgr.selected.id) {
            return;
        }

        this.mgr.select(args.id);
    }

}