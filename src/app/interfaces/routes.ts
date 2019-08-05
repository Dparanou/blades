import {Component} from "@angular/core";

export interface Routes {
    path : string;
    component : Component;
    data ?: kindParam;
    children ?: Routes[];
}

export interface kindParam {
    kind : string
}