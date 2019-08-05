import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //For Campaign Detail Overview
  campaign;
  list_name;

  //For Subscribers List Detail
  subscribers_list_name;
  constructor() { }
}
