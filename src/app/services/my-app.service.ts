import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { MenuList } from '../interfaces/menu-item';
import {BehaviorSubject, Subject} from 'rxjs';
import {SubscribersList} from "../interfaces/subscribers-list-item";
import { Observable } from 'rxjs';
import {CampaignList} from "../interfaces/campaign-list";

@Injectable({
  providedIn: 'root'
})
export class MyAppService {

  private history : number[] = [];
  private selectedClosingBlade : number;
  private i : number = 0;
  private currentTitle = new Subject<string>();
  public newListSubscribers = new Subject<SubscribersList>();

  private menuState = new BehaviorSubject<string>("out");
  currentMenuState = this.menuState.asObservable();


  constructor(private http : HttpClient) {}

  getAllMenuItems() : Observable<MenuList[]>{
    //console.log(this.http.get('http://localhost:4200/assets/data/menu-list.json'));
    return this.http.get<MenuList[]>('data/menu-list.json');
  }

  getAllSubscribersList() : Observable<any[]> {
    return this.http.get<any[]>('data/subscribers-list.json');
  }

  getAllSubscribersBlocked() : Observable<any[]> {
    return this.http.get<any[]>('data/subscribers-blocked.json');
  }

  getAllCaimpaignList() : Observable<CampaignList[]> {
    return this.http.get<CampaignList[]>('data/campaign-list.json');
  }

  getLastTitle() {
    return this.currentTitle;
  }

  setLastTitle(title : string) {
    this.currentTitle.next(title);
  }

  addListId(data) {
    data.id = this.i + 1;
    this.i++;
    data.subscribers = 0;
    this.newListSubscribers.next(data);
    // return this.http.put('data/subscribers-list.json', {
    //   id : 1,
    //   title : listTitle,
    //   subscribers : 0,
    //   label : label
    // })
    //     .subscribe( data => console.log(data));
  }

  deleteListId(id : number) {
    // const url = `${'http://localhost:4200/subscribers/lists/details;id='}${id}`;
    // return this.http.delete(url, this.httpOptions);
  }

  //Set - Get blade that request to close, for checking it with nested blades and navigate to correct parent.
  setSelectedClosingBlade(id : number) {
    this.selectedClosingBlade = id;
  }

  getSelectedClosingBlade() {
    return this.selectedClosingBlade;
  }

  getHistory() {
    return this.history;
  }

  pushToHistory(id : number) {
      this.history.push(id);
  }

  popFromHistory() : number{
    let id = this.history.pop();
    return id;
  }

  informHistory(arr : number[]) {
      this.history = arr;
  }

  changeMenuState (state : string) {
      this.menuState.next(state);
  }
}
