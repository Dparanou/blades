import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template : `
    <div class="body">
        <app-navbar></app-navbar>
        <app-side-navbar></app-side-navbar>
        <app-main-content></app-main-content>
    </div>`,
  styles: [`.body {
    position: absolute;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    }`
  ]
})
export class AppComponent {

}
