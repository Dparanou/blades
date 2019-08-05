import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <img src="../../../assets/images/say-hello.png" alt="say hello apifon ">
    </div>
  `,
  styles: [
      `img {
        width: 90%;
        height: 95% ;  
        position: fixed;
    }`
  ]
})
export class DashboardComponent {

}
