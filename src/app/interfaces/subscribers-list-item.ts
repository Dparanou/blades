import {Subscriber} from "./subscriber";

export interface SubscribersList {
    id : number;
    title : string;
    numOfSubs : number;
    subscribers : Subscriber;
    label ?: string;
}