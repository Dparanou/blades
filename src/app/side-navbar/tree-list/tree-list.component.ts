import { Component, OnInit, Input } from '@angular/core';
import { MenuList } from '../../interfaces/menu-item';
import { of } from "rxjs";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MyAppService } from '../../services/my-app.service';

const GetChildren = (node: MenuList) => of(node.children);
const TC = new NestedTreeControl(GetChildren);

@Component({
  selector: 'app-tree-list',
  template: `
    <mat-tree [dataSource]="menu_list" [treeControl]="tc">
          
        <mat-tree-node *matTreeNodeDef="let node; let i = index" matTreeNodeToggle >
            <button mat-button >
                <i class="material-icons">{{node.icon}}</i>
                <a routerLink="/{{node.parent | lowercase}}/{{node.name | lowercase}}" routerLinkActive="active"
                class="node-name" [hidden]="menuState=='in'">{{node.name}}</a>
            </button>
        </mat-tree-node>
          
        <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodeToggle>
            <button mat-button matTreeNodeToggle>
                  <i class="material-icons">{{node.icon}}</i>
                  <span class="node-name" [hidden]="menuState=='in'" (click)="menuState=='in'">{{node.name}}</span> 
                   <span class="expand-more" [hidden]="menuState=='in'">
                    <i class="material-icons expand" >expand_more</i>
                   </span>
                  
            </button>
            <ul [class.example-tree-invisible]="menuState=='in'" [hidden]="tc.isExpanded(node)==false">
              <ng-container matTreeNodeOutlet></ng-container>
            </ul>
        </mat-nested-tree-node>
        
     </mat-tree>
      
    `,
  styleUrls: ['tree-list.component.css']
})
export class TreeListComponent implements OnInit {
  menu_list : MenuList[];
  tc = TC;
  error :string;

   @Input("menuState") menuState: string;

  constructor(private myAppService: MyAppService) {}

  ngOnInit() {
    this.myAppService.getAllMenuItems()
        .subscribe(
            data  => this.menu_list = data,
            error => this.error = error.statusText
        );
  }

  hasChild(_: number, node: MenuList) {
    return node.children != null && node.children.length > 0;
  }
}
