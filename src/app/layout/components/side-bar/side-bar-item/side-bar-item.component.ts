import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss']
})
export class SideBarItemComponent implements OnInit {
  item = {
    icon: 'test-icon',
    title: 'test',
    children: [
      {
        icon: 'test-icon-child1',
        title: 'child1',
      },
      {
        icon: 'test-icon-child2',
        title: 'child1',
      },
    ],
    hidden: false
  }
  pathList = [
    {
      icon: 'user',
      title: 'dashboard',
      path: 'dashboard',
      children: [
        {
          icon: 'user',
          title: 'child1',
          path: 'child1',
        },
        {
          icon: 'user',
          title: 'child2',
          path: 'child2',
        },
      ],
      hidden: false
    },
    {
      icon: 'user',
      title: 'Shipmento',
      path: 'shipment',
      hidden: false
    }
  ]
  isCollapsed = false
  onlyOneChild = null
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changePath(path: string) {
    console.log(path, '=================path');

    this.router.navigateByUrl(path)
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
