import { Injectable } from '@angular/core';
import {BaseContext, BaseParam, BaseState, BladeParamConstants, BaseMetaData} from "./models";
import {BladeRegistry} from "./bladeRegistry.service";
import {MyAppService} from "../../services/my-app.service";

@Injectable({
  providedIn: 'root'
})
export class BladeManager {
    private static BLADER_HISTORY_KEY = 'bladerHistory';

    private _blades: Array<BaseContext> = new Array<BaseContext>();

    public entryId: number;

    public selected: BaseContext | undefined;

    public get blades(): Array<BaseContext> {
        return this._blades;
    }

    public get mustRestore(): boolean {
        return sessionStorage.getItem(BladeManager.BLADER_HISTORY_KEY) !== null;
    }

    constructor( public registry : BladeRegistry, private myAppService : MyAppService) {}

    public add(key: string , params?: Array<BaseParam>, id?: number) : number
    {
        return this.addInternal(key, id, params);
    }

    public restore() : void {
        const history = sessionStorage.getItem(BladeManager.BLADER_HISTORY_KEY);
        //console.log("history " + history);
        if(!history) {
            return ;
        }

        const historyCtx : Array<BaseContext> = JSON.parse(history);
        historyCtx.forEach((b: BaseContext) => {
            if(b.isEntry) {
                this.entryId = b.id;
            }
            if(!b.metaData.isLazy) {
                this.add(b.metaData.key, b.params, b.id);
            }
        })
    }

    public reset() : void {
        sessionStorage.removeItem(BladeManager.BLADER_HISTORY_KEY);
    }

    public remove(id : number) : void {
        if(this.exists(id)) {
            //console.log("remove id " + id);
            this.myAppService.setLastTitle(this.get(id).metaData.key);
            this._blades = this._blades.filter((b: BaseContext) => {
                return b.id !== id;
            });
            sessionStorage.setItem(BladeManager.BLADER_HISTORY_KEY, JSON.stringify(this._blades));
        }
    }

    public exists(id: number): boolean {
        return this._blades.some((b: BaseContext) => b.id === id);
    }

    public get(id: number): BaseContext {
        const item = this._blades.find((b: BaseContext) => {
            return b.id === id;
        });

        if (!item) { throw new Error("Blade not found"); }

        return item;
    }

    public select(id: number): void {
        this.selected = this.get(id);
    }

    private addInternal(key: string, id: number, params: BaseParam[], state?: BaseState) {
        const metaData = this.getMetaData(key);
        const newId = id ? id : new Date().valueOf();

        // Ensure that state is set if available.
        if (state) {
            params.push({ key: BladeParamConstants.BLADE_STATE, value: state });
        }

        const ctx = new BaseContext(newId, metaData, params);
        ctx.isEntry = this._blades.length === 0;
        if (ctx.isEntry) {
            this.entryId = newId;
        }
        this._blades.push(ctx);

        sessionStorage.setItem(BladeManager.BLADER_HISTORY_KEY, JSON.stringify(this._blades));

        this.select(ctx.id);

        return newId;
    }

    private getMetaData(key: string): BaseMetaData {
        if (!this.registry.exists(key)) {
            throw new Error(`BladeMetaData for key ${key} not found!`);
        }

        return this.registry.get(key);
    }
}
