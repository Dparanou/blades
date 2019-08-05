import { Type } from '@angular/core';

export interface Base {
    id : number;
    title : string;
    description ?: string,
    button1 ?: string,
    button2 ?: string,
    button3 ?: string,
    button4 ?: string,
    toolbar : boolean,
    filter : boolean,
    date : boolean
}

export enum BaseState {
    default = 1,
    firstState = 2,
    secondState = 3
}

export class BaseParam {
    public key: string;
    public value: any;
}

export interface BaseArgs {
    id: number;
    metaData: BaseMetaData;
}

export class BaseContext {
    public get hasParams(): boolean {
        return this.params.length > 0;
    }

    public isEntry = false;

    public params: Array<BaseParam>;

    public constructor(
        public id: number,
        public metaData: BaseMetaData,
        params?: Array<BaseParam>
    ) {
        if (params) {
            this.params = params;
        } else {
            this.params = new Array<BaseParam>();
        }
    }

    public toBaseArgs(): BaseArgs {
        return { id: this.id, metaData: this.metaData };
    }
}

export class BaseMetaData {
    public isLazy = false;

    public constructor(
        public key: string,
        public component: Type<any>,
        public factoryFn?: Function
    ) {
        this.isLazy = this.factoryFn !== undefined;
    }
}

export class BladeParamConstants {
    public static readonly BLADE_STATE = 'BaseState';
}