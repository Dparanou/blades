import { Injectable } from '@angular/core';
import {BaseMetaData} from "./models";

@Injectable({
  providedIn: 'root'
})
export class BladeRegistry {
  private _registry: Map<string, BaseMetaData> = new Map<string, BaseMetaData>();

  public register(blade: BaseMetaData) : void {
    if(this._registry.has(blade.key)) {
      return ;
    }
    this._registry.set(blade.key, blade);
  }

  public exists(key : string) : boolean  {
    return this._registry.has(key);
  }

  public get(key : string) : BaseMetaData {
    const item = this._registry.get(key);

    if(!item) {
      console.log("No item found");
      throw new Error(`BladeMetaData for key ${key} was not found!`);
    }

    return item;
  }

  constructor() { }
}
